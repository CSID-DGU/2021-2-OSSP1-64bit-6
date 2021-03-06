var express = require('express');
var router = express.Router();
var db = require('../modules/db-connection');
var sql = require('../sql');
var checkLoginMiddleWare = require('../modules/check-login-middleware');
var fileController = require('../modules/file-controller');
var path = require('path');
var stringSimilarity = require("string-similarity");


// const CODE = process.env.ROOT_CODE; //project path
// Check user for api
router.use(checkLoginMiddleWare.injectUerforAPI)

/**
 * get
 * 사용자 프로젝트 출력
 * @param
 */
router.get('/getcategory', async function (req, res) {
    // const { id } = req.user._user[0];
    try {
        const [rows] = await db.query(sql.problems.getCategoryProblems)
        res.status(200).send({
            result: true,
            data: rows,
            message: '해당하는 유저 프로젝트 리스트'
        })
    } catch (error) {
        console.log(`유저 프로젝트 출력 API 오류 ${error}`)
    }
})
router.get('/getcategories', async function (req, res) {
    try {
        const [rows] = await db.query(sql.problems.getCategories)
        res.status(200).send({
            result: true,
            data: rows,
            message: '해당하는 유저 프로젝트 리스트'
        })
    } catch (error) {
        console.log(`유저 프로젝트 출력 API 오류 ${error}`)
    }
})

//객관식
router.get('/getlistmultiproblems', async function (req, res) {
    try {
        let [rows] = await db.query(sql.problems.selectMultiProblems)
        const { id: userId } = req.user._user[0];
        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                let id = rows[i].id;
                let [answers] = await db.query(sql.problems.selectAnswerByProblemId, [id])
                rows[i]["answers"] = answers

                //해당하는 문제를 케테고리를 출력
                let [row] = await db.query(sql.problems.selectCategoryFromMultiProblems, [id]);
                //!일단
                if (row.length !== 0) {
                    let { parent_id } = row[0];
                    let [tagRow] = await db.query(sql.problems.getNameTag, [parent_id]);
                    row[0]["parent_name"] = tagRow[0].name;
                    rows[i]["tagInfo"] = row[0];
                }
                let [submit] = await db.query(sql.problems.selectMultiChoiceSubmit, [userId, id])
                rows[i]["submit"] = submit.length !== 0 ? submit[0] : []
            }
            res.status(200).send({
                result: true,
                data: rows,
                message: '특정한 문제 리스트 입니다'
            })
        } else {
            res.status(200).send({
                result: true,
                data: [],
                message: '해당 문제가 없습니다'
            })
        }
    } catch (e) {
        console.log(e)
    }
})
router.get('/multi', async function (req, res) {
    const { problemId } = req.query;
    try {
        let [rows] = await db.query(sql.problems.selectMultiChoiceProblemById, [problemId]);
        if (rows.length > 0) {
            let [answers] = await db.query(sql.problems.selectAnswerByProblemId, [rows[0].id])
            rows[0].answers = answers

            let [category] = await db.query(sql.problems.selectCategoryFromMultiProblemId, [rows[0].id])
            let [categoryInfo] = await db.query(sql.problems.selectCategoryInfoById, [category[0].id])

            let categoryModel = {
                child: categoryInfo[0]
            }

            const { parent_id, level } = categoryInfo[0]
            if (level === 2) {
                let [row] = await db.query(sql.problems.selectCategoryInfoById, [parent_id])
                categoryModel.parent = row[0]
            } else if (level === 3) {
                let [row] = await db.query(sql.problems.selectCategoryInfoById, [parent_id])
                categoryModel.parent = row[0]
                [row] = await db.query(sql.problems.selectCategoryInfoById, [row[0].parent_id])
                categoryModel.grand = row[0]
            }
            rows[0].category = categoryModel
            res.status(200).send({
                result: true,
                data: rows[0],
                message: "특정한 문제 리스트 입니다",
            });
        } else {
            res.status(200).send({
                result: true,
                data: [],
                message: "해당 문제가 없습니다",
            });
        }
    } catch (e) { }
})
router.get('/shortans', async function (req, res) {
    try {
        let [rows] = await db.query(sql.problems.selectShortansProblems)
        const { id: userId } = req.user._user[0];
        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                let id = rows[i].id;
                //해당하는 문제를 케테고리를 출력
                let [row] = await db.query(sql.problems.selectCategoryFromShortantsProblems, [id]);
                
                let { parent_id } = row[0];
                let [tagRow] = await db.query(sql.problems.getNameTag, [parent_id]);
                if(tagRow.length !== 0) {
                    row[0]["parent_name"] = tagRow[0].name;
                    rows[i]["tagInfo"] = row[0];
    
                    let [submit] = await db.query(sql.problems.selectShortansSubmitByUserProblem, [userId, id])
                    rows[i]["submit"] = submit.length !== 0 ? submit[0] : []
                }
            }
            res.status(200).send({
                result: true,
                data: rows,
                message: '특정한 문제 리스트 입니다'
            })
        } else {
            res.status(200).send({
                result: true,
                data: [],
                message: '문제가 없습니다.'
            })
        }
    } catch (e) {
        console.log(e)
    }
})
router.get('/getmyproblems', async function (req, res) {
    try {
        const { id } = req.user._user[0];
        const [rows] = await db.query(sql.problems.getMyListProblem, [id,id,id])
        res.status(200).send({
            result: true,
            data: rows,
            message: '내 문제 출력 성공'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            result: false,
            data: [],
            message: "내 문제 출력 실패"
        })
    }
})
//Get tags tree structure
router.get('/treetags', async function (req, res) {
    try {
        let [level1] = await db.query(sql.problems.selectTagsByTutorialId2, [0])
        for (let i = 0; i < level1.length; i++) {
            let [level2] = await db.query(sql.problems.selectTagsByTutorialId2, [level1[i].id])
            level1[i].level2 = level2;
            for (let j = 0; j < level1[i].level2.length; j++) {
                let [level3] = await db.query(sql.problems.selectTagsByTutorialId2, [level1[i].level2[j].id])
                if (level3.length !== 0) {
                    level1[i].level2[j].level3 = level3;
                } else {
                    level1[i].level2[j].level3 = [];
                    continue;
                }
            }
        }
        res.status(200).send({
            result: true,
            data: level1,
            message: 'Tutorisl 리스트'
        })
    } catch (e) {
        console.log(e)
    }
})
//해당하는 Tutorial tag 리스트 출력함, 해당하는 tag 문제 리스트를 출력함
//! 수정필요함
router.get('/category', async function (req, res) {
    try {
        const { id } = req.query;
        let [category] = await db.query(sql.problems.selectCategoryInfoById, [id])
        let [childCategories] = await db.query(sql.problems.selectTagsByTutorialId, [id])
        const { id: userId } = req.user._user[0];
        if (childCategories.length === 0) {
            res.status(200).send({
                result: true,
                data: [],
                message: '해당하는 Tutorial tag 리스트'
            })
        } else {
            for (let i = 0; i < childCategories.length; i++) {
                let [problemsbyCategory] = await db.query(sql.problems.selectProblemByCategoryId, [childCategories[i].id])
                childCategories[i].problems = new Array();
                if (problemsbyCategory[0]) {
                    // let [submit] = await db.query(sql.problems.selectMultiChoiceSubmit, [userId, problemsbyCategory[0].id])
                    // problemsbyCategory[0]["submit"] = submit.length !== 0 ? submit[0] : []
                    childCategories[i].problems.push(problemsbyCategory)
                }
                childCategories[i].problems = [].concat(...childCategories[i].problems)
            }
        }
        res.status(200).send({
            result: true,
            data: childCategories,
            category: category[0],
            message: '해당하는 Tutorial tag 리스트'
        })
        // let firstTagId = tags[0].id;
        // let [childTags] = await db.query(sql.problems.selectTagsByTutorialId,[firstTagId])

        // //Level2 with 알고리즘 및 자료구죠
        // if(childTags.length !== 0){
        //     for (let i = 0; i < tags.length; i++) { 
        //         let [child_tags] = await db.query(sql.problems.selectTagsByTutorialId,[tags[i].id])
        //         tags[i] = {...tags[i], childTag : child_tags};
        //         for(let j = 0; j < tags[i].childTag.length; j++){
        //             let [problems] = await db.query(sql.problems.selectProblemsByTagId,[tags[i].childTag[j].id]);
        //             tags[i].childTag[j] = {... tags[i].childTag[j], problems}
        //         }
        //     }
        //     res.status(200).send({
        //         result: true,
        //         data: tags,
        //         message:'해당하는 Tutorial tag 리스트'
        //     })
        // }else{

        //     // category tag id를 받음
        //     let [tag] = await db.query(sql.problems.selectTagById, [id]);
        //     console.log(tag)
        //     tag[0].childTag = tags;
        //     console.log(tag)
        // for(let j = 0; j < tag[0].childTag.length; j++){

        //     let categoryId =  tag[0].childTag[j].id;
        //     let [problemsbyCategory] = await db.query(sql.problems.selectProblemByCategoryId,[categoryId])
        //     //해당하는 문제를 테스트 케이스를 출력함
        //     for(let k = 0; k < problemsbyCategory.length; k++){
        //         let { problem_id } = problemsbyCategory[k];
        //         console.log(problem_id)
        //         let [testcases] = await db.query(sql.problems.selectTestCaseFromProblemId,[problem_id])
        //         let filterTestCase = testcases.map(testcase => ({
        //             input_exp: testcase.input_example, 
        //             output_exp: testcase.output_example
        //             }
        //         ))
        //         problemsbyCategory[k]["testcases"] = filterTestCase;
        //     }
        //     // let [problems] = await db.query(sql.problems.selectProblemsByTagId,[tag[0].childTag[j].id]);
        //     tag[0].childTag[j] = {...tag[0].childTag[j], problemsbyCategory}
        // }
        //     res.status(200).send({
        //         result: true,
        //         data: tag,
        //         message:'해당하는 Tutorial tag 리스트'
        //     })
        // }
    } catch (e) {
        console.log(e)
    }
})
router.get('/getproblemsinfor', async function (req, res) {
    try {
        var today=new Date();
        var today_dayLabel = today.getDay() + 1;
        var today_Date = today.getDate();
        const [visitor_day] = await db.query(sql.user.selectVisitorDay, today_dayLabel);

        if(today_Date !== Number(visitor_day[0].day))
            var visitorCnt = 1;
        else
            var visitorCnt = visitor_day[0].visitor_cnt+1;
        
        await db.query(sql.user.updateVisitorCnt, [visitorCnt, today, today_dayLabel]);

        let [row] = await db.query(sql.problems.getCountProblem)
        const { count: countProblem } = row[0];

        [row] = await db.query(sql.problems.getCountMultiChoiceProblem)
        const { count: countMultiProblem } = row[0];

        [row] = await db.query(sql.problems.getCountShortProblem)
        const { count: countShort } = row[0];
        res.status(200).send({
            result: true,
            data: {
                "pbl_count": countProblem,
                "pbl_scoring": countMultiProblem,
                "pbl_dont": countShort,
                "language_scroring": 5
            },
            message: '문제 정보'
        })

    } catch (error) {
        console.log("Get problem info" + error)
    }

})

router.get('/problemsdata', async function (req, res) {
    const { id: userId } = req.user._user[0];
    try {
        let [rows] = await db.query(sql.problems.selectProblems)
        //console.log("rows");
        //console.log(rows);
        //rows = rows.slice(0, 30);
        //!수정 필요함
        // for(let j = 0; j < rows.length; j++) 
        // let tempRows = rows.splice(0,23);
        for (let j = 0; j < rows.length; j++) {
            //console.log(j)
            var { id } = rows[j];
            //해당하는 문제의 테스트 케이스를 출력함
            let [testcases] = await db.query(sql.problems.selectTestCaseFromProblemId, [id])
            let filterTestCase = testcases.map(testcase => ({
                input_exp: testcase.input_example,
                output_exp: testcase.output_example
            }
            ))
            rows[j]["testcases"] = filterTestCase;

            //해당하는 문제는 Category를 출력
            let [row] = await db.query(sql.problems.selectCategoryFromProblemId, [id]);
            let { parent_id } = row[0];
            let [tagRow] = await db.query(sql.problems.getNameTag, [parent_id]);
            row[0]["parent_name"] = tagRow[0].name;
            rows[j]["tagInfo"] = row[0];

            //유저를 좋아하는 문제인제 체크함
            //console.log(userId);
            //console.log(id);z
            let [problem] = await db.query(sql.problems.checkLikeProblem, [userId, id])
            //console.log("problem");
            rows[j]["like"] = problem.length === 1 ? true : false;

            let [submit] = await db.query(sql.problems.selectProblemSubmit, [userId, id])
            rows[j]["submit"] = submit.length !== 0 ? submit[0] : []
        }
        //console.log(rows);
        res.status(200).send({
            result: true,
            data: rows,
            message: '전체 문제 리스트'
        })

    } catch (error) {
        console.log("Problems Data problemsdata" + error)
    }

})

router.get('/submit-multichoice', async function (req, res) {
    const { problemId, answerId } = req.query
    const { id: userId } = req.user._user[0];
    try {
        if (problemId && answerId) {
            let [answer] = await db.query(sql.problems.selectSubmitMultiChoiceProblem, [problemId, answerId])
            let [row] = await db.query(sql.problems.selectMultiChoiceSubmit, [userId, problemId])
            if(row.length !== 0){
                await db.query(sql.problems.updateMultiChoiceSubmit, [answer[0].is_correct, answerId, problemId, userId])
            }else{
                await db.query(sql.problems.insertMultiChoiceSubmit, [userId, problemId,answer[0].is_correct, answerId])
            }
            if (answer.length !== 0) {
                res.status(200).send({
                    result: true,
                    data: answer[0],
                    message: '문제 채점 실패합니다.'
                })
            }
        } else {
            res.status(200).send({
                result: false,
                data: [],
                message: '문제 채점 실패합니다.'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            result: false,
            data: [],
            message: '문제 추가 권한이 없습니다.'
        })
    }
})

router.post('/submit-shortans', async function (req, res) {
    const { problemId, answer } = req.body
    const { id: userId } = req.user._user[0];

    try {
        if (problemId && answer) {
            let [row] = await db.query(sql.problems.selectAnswerByShortansPro, [problemId])
            const { answer_content} = row[0]
            var similarity = stringSimilarity.compareTwoStrings(answer_content, answer)

            let [answerSubmit] = await db.query(sql.problems.selectShortansSubmitByUserProblem, [userId, problemId])

            let answer_status = similarity >= 0.7 ? true : false;
            if(answerSubmit.length !== 0){
                await db.query(sql.problems.updateShortansSubmit, [answer_status, answer, userId, problemId])
            }else{
                await db.query(sql.problems.insertShortSubmit, [userId, problemId, answer_status, answer])
            }
            
            res.status(200).send({
                result: false,
                data: similarity,
                message: '문제 채점 실패합니다.'
            })
        } else {
            res.status(200).send({
                result: false,
                data: [],
                message: '문제 채점 실패합니다.'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            result: false,
            data: [],
            message: '문제 추가 권한이 없습니다.'
        })
    }
})
router.post('/problemtomylist', async function (req, res) {
    try {
        const { problemId, problemType } = req.body;
        const { id } = req.user._user[0];
        const [row] = await db.query(sql.problems.checkLikeProblem, [id, problemId, problemType])
        if (row.length === 1) { //liked
            await db.query(sql.problems.removeProblemMyList, [id, problemId, problemType])
        } else { //don't like
            await db.query(sql.problems.setProblemMyList, [id, problemId, problemType])
        }
        res.status(200).send({
            result: true,
            data: [],
            message: '내문제 추가 성곡'
        })
    } catch (error) {
        res.status(400).send({
            result: false,
            data: [],
            message: "내문제 추가 실패함"
        })
    }
})
router.get('/delete-myproblem', async function (req, res) {
    try {
        const { id  } = req.query
        await db.query(sql.problems.deleleMyProblem, [id])
        res.status(200).send({
            result: true,
            data: [],
            message: '내문제 추가 성곡'
        })
    } catch (error) {
        res.status(400).send({
            result: false,
            data: [],
            message: "내문제 추가 실패함"
        })
    }
})


router.get('/problem-processor', async function (req, res){
    try {
        const { userId, problemId  } = req.query
        const [row] = await db.query(sql.problems.selectProblemProcessor, [problemId, userId])
        res.status(200).send({
            result: true,
            data: row.length != 0 ? row[0].times : 0,
            message: '내문제 추가 성곡'
        })
    } catch (error) {
        res.status(400).send({
            result: false,
            data: [],
            message: "문제 단계"
        })
    }
})

router.get('/status-problem', async function (req, res){
    try {
        const { userId, problemId  } = req.query
        const [row] = await db.query(sql.problems.selectProblemProcessor, [problemId, userId])
        res.status(200).send({
            result: true,
            data: row,
            message: '내문제 추가 성곡'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            result: false,
            data: [],
            message: "문제 단계"
        })
    }
})

router.get('/status-problems', async function (req, res){
    try {
        const { id } = req.user._user[0];
        const [coding] = await db.query(sql.problems.joinCategoryLevelProblem_coding, [id])
        const [multichoice] = await db.query(sql.problems.joinCategoryLevelProblem_mul, [id])
        const [shortans] = await db.query(sql.problems.joinCategoryLevelProblem_shortans, [id])

        
	        //implementation
        const [imp_multi] = await db.query(sql.problems.selectImpMulti,[id])
        const [imp_short] = await db.query(sql.problems.selectImpShort,[id])
        const [imp_prog] = await db.query(sql.problems.selectImpProg,[id])

        //math
        const [mat_multi] = await db.query(sql.problems.selectMathMulti,[id])
        const [mat_short] = await db.query(sql.problems.selectMathShort,[id])
        const [mat_prog] = await db.query(sql.problems.selectMathProg,[id])

        //String
        const [str_multi] = await db.query(sql.problems.selectStrMulti,[id])
        const [str_short] = await db.query(sql.problems.selectStrShort,[id])
        const [str_prog] = await db.query(sql.problems.selectStrProg,[id])

        //Data Structure
        const [dat_multi] = await db.query(sql.problems.selectDataMulti,[id])
        const [dat_short] = await db.query(sql.problems.selectDataShort,[id])
        const [dat_prog] = await db.query(sql.problems.selectDataProg,[id])

        //Algorithm
        const [alg_multi] = await db.query(sql.problems.selectAlgoMulti,[id])
        const [alg_short] = await db.query(sql.problems.selectAlgoShort,[id])
        const [alg_prog] = await db.query(sql.problems.selectAlgoProg,[id])    

        const [count_heat] = await db.query(sql.problems.countTime, [id,id,id])
        const [con_heat] = await db.query(sql.problems.conTime, [id,id,id])



                //정,오답률
        const [cor_rank] = await db.query(sql.problems.selectCorr,[id])
        const [inc_rank] = await db.query(sql.problems.selectInco,[id])

        //implecation 정,오답률
        const [cor_imp] = await db.query(sql.problems.selectCorrImp,[id])
        const [inc_imp] = await db.query(sql.problems.selectIncoImp,[id])  
        
        //math 정,오답률
        const [cor_mat] = await db.query(sql.problems.selectCorrMath,[id])
        const [inc_mat] = await db.query(sql.problems.selectIncoMath,[id])

        //string 정,오답률
        const [cor_str] = await db.query(sql.problems.selectCorrStr,[id])
        const [inc_str] = await db.query(sql.problems.selectIncoStr,[id])

        //data structure 정,오답률
        const [cor_dat] = await db.query(sql.problems.selectCorrData,[id])
        const [inc_dat] = await db.query(sql.problems.selectIncoData,[id])

        //algorithm 정,오답률
        const [cor_alg] = await db.query(sql.problems.selectCorrAlgo,[id])
        const [inc_alg] = await db.query(sql.problems.selectIncoAlgo,[id])

	   
       const [pro_date] = await db.query(sql.problems.selectProblemDate,[id])
	
        let nothing;
        
        // ----------pro
        let isCorrectArrayCoding = [];
        let noCorrectArrayCoding = [];
        coding.map((item) => item.answer_status === 1 ? isCorrectArrayCoding.push(item.problem_id) : noCorrectArrayCoding.push(item.problem_id) && noCorrectArrayCoding.push(item.name))

        let levelCoding=[0,0,0];
        coding.map((item) => item.answer_status === 1 ?
                                  item.level.charCodeAt(0).toString(16) === 'd558' ? levelCoding[0]++
                                  : item.level.charCodeAt(0).toString(16) === 'c911' ? levelCoding[1]++
                                  : levelCoding[2]++
                                  : nothing=1)   
        
        // ----------mul
        let isCorrectArrayMul = [];
        let noCorrectArrayMul = [];
        multichoice.map((item) => item.answer_status === 'true' ? isCorrectArrayMul.push(item.problem_id) : noCorrectArrayMul.push(item.problem_id) && noCorrectArrayMul.push(item.name))
        let levelMul=[0,0,0];
        multichoice.map((item) => item.answer_status === 'true' ?
                                  item.level.charCodeAt(0).toString(16) === 'd558' ? levelMul[0]++
                                  : item.level.charCodeAt(0).toString(16) === 'c911' ? levelMul[1]++
                                  : levelMul[2]++
                                  : nothing=1)
        //---------short        
        let isCorrectArrayShortans = [];
        let noCorrectArrayShortans = [];
        shortans.map((item) => item.answer_status === 1 ? isCorrectArrayShortans.push(item.problem_id) : noCorrectArrayShortans.push(item.problem_id) && noCorrectArrayShortans.push(item.name))
        
        let levelShortans=[0,0,0];
        shortans.map((item) => item.answer_status === 1 ?
                                  item.level.charCodeAt(0).toString(16) === 'd558' ? levelShortans[0]++
                                  : item.level.charCodeAt(0).toString(16) === 'c911' ? levelShortans[1]++
                                  : levelShortans[2]++
                                  : nothing=1) 
	
                                     
        
	let proArray = [];
        let proDate = [];
        let proCategory = [];
	let proType = [];    
        imp_multi.map((item) => (proArray.push(item.problem_id),proDate.push(item.timestamp),proCategory.push("multi"),proType.push("imp") ))
        imp_short.map((item) => (proArray.push(item.problem_id),proDate.push(item.timstamp),proCategory.push("short"), proType.push("imp")))
        imp_prog.map((item) => (proArray.push(item.problem_id),proDate.push(item.timestamp),proCategory.push("prog"),proType.push("imp")))


        mat_multi.map((item) => (proArray.push(item.problem_id),proDate.push(item.timestamp),proCategory.push("multi"),proType.push("math") ))
        mat_short.map((item) => (proArray.push(item.problem_id),proDate.push(item.timstamp),proCategory.push("short"),proType.push("math")))
        mat_prog.map((item) => (proArray.push(item.problem_id),proDate.push(item.timsetamp),proCategory.push("prog"),proType.push("math")))



        str_multi.map((item) => (proArray.push(item.problem_id),proDate.push(item.timestamp),proCategory.push("multi"),proType.push("str") ))
        str_short.map((item) => (proArray.push(item.problem_id),proDate.push(item.timstamp),proCategory.push("short"),proType.push("str")))
        str_prog.map((item) => (proArray.push(item.problem_id),proDate.push(item.timestamp),proCategory.push("prog"),proType.push("str")))



        dat_multi.map((item) => (proArray.push(item.problem_id),proDate.push(item.timestamp),proCategory.push("multi"),proType.push("data") ))
        dat_short.map((item) => (proArray.push(item.problem_id),proDate.push(item.timstamp),proCategory.push("short"),proType.push("data")))
        dat_prog.map((item) => (proArray.push(item.problem_id),proDate.push(item.timestamp),proCategory.push("prog"),proType.push("data")))


        alg_multi.map((item) => (proArray.push(item.problem_id),proDate.push(item.timestamp),proCategory.push("multi"),proType.push("algo") ))
        alg_short.map((item) => (proArray.push(item.problem_id),proDate.push(item.timstamp),proCategory.push("short"),proType.push("algo")))
        alg_prog.map((item) => (proArray.push(item.problem_id),proDate.push(item.timestamp),proCategory.push("prog"),proType.push("algo")))

        
        //-----------rank
        const [rank_All] = await db.query(sql.problems.getRankAll);
        const [rank_Coding] = await db.query(sql.problems.getRankCoding);
        const [rank_Mul] = await db.query(sql.problems.getRankMul);
        const [rank_Short] = await db.query(sql.problems.getRankShort);

        //----------level별
        const [isCorrect_Level] = await db.query(sql.problems.isCorrectLevel);
        const [noCorrect_Level] = await db.query(sql.problems.noCorrectLevel);

        //----------user count
        var today = new Date();
        var today_DayLabel = today.getDay();
        var today_Date = today.getDate();
        if(today_DayLabel === 0)
            var last_DayLabel=6;
        else
            var last_DayLabel= today_DayLabel-1;

        today_DayLabel = today_DayLabel + 1;
        last_DayLabel = last_DayLabel + 1;
        
        const [user_Today] = await db.query(sql.user.selectUserDay, today_DayLabel);
        const [user_Cnt] = await db.query(sql.user.selectUserCnt);
        const [user_Lastday_Tmp] = await db.query(sql.user.selectUserDay, last_DayLabel);
        var user_Lastday = user_Lastday_Tmp[0].user_cnt;
        
        if(today_Date !== Number(user_Today[0].day) || user_Cnt[0] !== Number(user_Today[0].user_cnt)){
            let cnt_Tmp = Number(user_Cnt[0].user_cnt);
            await db.query(sql.user.updateUserCnt, [cnt_Tmp, today, today_DayLabel]);
        }
       
        //----------visitor count
        const [visitor_All] = await db.query(sql.user.selectVisitorAll);
        const [visitor_Today_Tmp] = await db.query(sql.user.selectVisitorDay,today_DayLabel);
        const [visitor_Lastday_Tmp] = await db.query(sql.user.selectVisitorDay, last_DayLabel);
        var visitor_Today = visitor_Today_Tmp[0].visitor_cnt;
        var visitor_Lastday = visitor_Lastday_Tmp[0].visitor_cnt;  

        //---------problem count
        const [get_Coding_Count] = await db.query(sql.problems.getCodingCount);
        const [get_Mul_Count] = await db.query(sql.problems.getMulCount);
        const [get_Short_Count] = await db.query(sql.problems.getShortCount);
        let coding_Count = get_Coding_Count[0].coding_cnt;
        let mul_Count = get_Mul_Count[0].mul_cnt;
        let short_Count = get_Short_Count[0].short_cnt;
        let all_Problem_Count = coding_Count + mul_Count + short_Count;
                                      
        
        



	            //정답률 Id, 제목, 정답률 퍼센트, 카테고리
        let corrArray = [];
        //오답률 Id, 제목, 오답률 퍼센트, 카테고리
        let incoArray = [];


        cor_rank.map((item) => (corrArray.push(item)))
        inc_rank.map((item) => (incoArray.push(item)))


        //정답률 Id, 제목, 정답률 퍼센트, 카테고리
        let corrImpArray = [];
        //오답률 Id, 제목, 오답률 퍼센트, 카테고리
        let incoImpArray = [];


        cor_imp.map((item) => (corrImpArray.push(item)))
        inc_imp.map((item) => (incoImpArray.push(item)))


        //정답률 Id, 제목, 정답률 퍼센트, 카테고리
        let corrMathArray = [];
        //오답률 Id, 제목, 오답률 퍼센트, 카테고리
        let incoMathArray = [];


        cor_mat.map((item) => (corrMathArray.push(item)))
        inc_mat.map((item) => (incoMathArray.push(item)))



        //정답률 Id, 제목, 정답률 퍼센트, 카테고리
        let corrStrArray = [];
        //오답률 Id, 제목, 오답률 퍼센트, 카테고리
        let incoStrArray = [];


        cor_str.map((item) => (corrStrArray.push(item)))
        inc_str.map((item) => (incoStrArray.push(item)))



        //정답률 Id, 제목, 정답률 퍼센트, 카테고리
        let corrDataArray = [];
        //오답률 Id, 제목, 오답률 퍼센트, 카테고리
        let incoDataArray = [];


        cor_dat.map((item) => (corrDataArray.push(item)))
        inc_dat.map((item) => (incoDataArray.push(item)))


        //정답률 Id, 제목, 정답률 퍼센트, 카테고리
        let corrAlgoArray = [];
        //오답률 Id, 제목, 오답률 퍼센트, 카테고리
        let incoAlgoArray = [];


        cor_alg.map((item) => (corrAlgoArray.push(item)))
        inc_alg.map((item) => (incoAlgoArray.push(item)))
        


	//날짜 별 문제풀이 수
        let problemDateArray = [];

        pro_date.map((item) => (problemDateArray.push(item)))



        
  
        res.status(200).send({
            result: true,
            data: {
                coding: {isCorrectArrayCoding, noCorrectArrayCoding, levelCoding},
                multichoice: {isCorrectArrayMul, noCorrectArrayMul, levelMul},
                shortans: {isCorrectArrayShortans, noCorrectArrayShortans, levelShortans},
                heatmap: {count_heat, con_heat},
		        proCate: {proArray,proDate,proCategory,proType},
                rank: {rank_All, rank_Coding, rank_Mul, rank_Short},
                level: {isCorrect_Level, noCorrect_Level},
                userCount: {user_Cnt, user_Lastday},
                visitor: {visitor_All, visitor_Today, visitor_Lastday},
                problemCount: {coding_Count, mul_Count, short_Count, all_Problem_Count},
		 rankAll: {corrArray,incoArray},
                rankImp: {corrImpArray,incoImpArray},
                rankMath: {corrMathArray,incoMathArray},
                rankStr: {corrStrArray,incoStrArray},
                rankData: {corrDataArray,incoDataArray},
                rankAlgo: {corrAlgoArray,incoAlgoArray},
		     proDate: {problemDateArray },
            },
            message: '자기 작업한 문제 현황'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            result: false,
            data: [],
            message: "자기 작업한 문제 현황 실패"
        })
    }
})

router.get('/status-multiproblem', async function (req, res){
    try {
        const { id } = req.user._user[0];
        const { problemId  } = req.query
        const [row] = await db.query(sql.problems.selectMultiChoiceSubmit, [id, problemId])
        
        res.status(200).send({
            result: true,
            data: row[0],
            message: '해당하는문제 정보'
        })
    } catch (error) {
        res.status(400).send({
            result: false,
            data: [],
            message: "해당하는문제 정보 출력 실패"
        })
    }
})
router.get('/status-shortans', async function (req, res){
    try {
        const { id } = req.user._user[0];
        const { problemId  } = req.query
        const [row] = await db.query(sql.problems.selectShortansSubmitByUserProblem, [id, problemId])
        
        res.status(200).send({
            result: true,
            data: row[0],
            message: '해당하는문제 정보'
        })
        
    } catch (error) {
        res.status(400).send({
            result: false,
            data: [],
            message: "해당하는문제 정보 출력 실패"
        })
    }
})


module.exports = router;
