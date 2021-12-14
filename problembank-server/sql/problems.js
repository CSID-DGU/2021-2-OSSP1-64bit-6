module.exports = {

    //==================SELECT==================== 
    selectTagById: "select * from plass_total_categories where id = ?",
    selectTutorials: "select * from plass_total_categories where parent_id = 0",
    getCategoryProblems : "select * from plass_total_categories where parent_id = 0",
    selectTagsByTutorialId: "select * from plass_total_categories where parent_id = ?",
    selectTagsByTutorialId2: "select tags.id,tags.name from plass_total_categories where parent_id = ?",
    getNameTag: "select name from plass_total_categories where id = ?",
    selectCategoryInfoById: "select * from plass_total_categories where id = ?",
    getCategories: "select * from plass_total_categories",
    //PROBLEM
    selectProblemsByTagId: `select p.*,ts.input_example,ts.output_example from plass_problems as p, plass_problem_category as pt, plass_testcases as ts 
    where p.id = pt.problem_id and p.id = ts.problem_id and pt.category_id = ?`,
    selectProblems: "select * from plass_problems",
    selectProblemById: "select * from plass_problems where id = ?",
    selectCategoryFromProblemId: "select * from plass_total_categories where id = (select category_id FROM plass_problem_category where problem_id = ?)",
    selectTestCaseFromProblemId: "select * from plass_testcases where problem_id = ?",
    selectProblemByCategoryId: `select pbl.*, ptc.name as category_name FROM plass_problems as pbl,  plass_problem_category as pc, plass_total_categories as ptc where  
    pbl.id = pc.problem_id and  pc.category_id = ? and pc.category_id  = ptc.id`,
    selectTestCaseByProblemId: `select id, input_example as input, output_example as output from plass_testcases where problem_id = ?`,
    selectAnswerByProblemId: "select * from plass_problem_multiplechoice_answer where problem_id = ?",
    getCountProblem: "SELECT COUNT(id) as count FROM plass_problems",
    selectProblemSubmit: "SELECT * FROM plass_problem_submit where user_id = ? and problem_id = ?",
    selectProblemProcessor: "select * from plass_problem_submit as pps where problem_id = ? and user_id = ? order by id desc limit 1;",
    //my list
    selectMyProblemById: "select * from plass_mylist_problem where user_id =?, problem_id =?",
    selectProblemSubmitByUserId: "SELECT * FROM plass_problem_submit where user_id = ?",


    //MULTICHOICE PROBLEM
    selectMultiChoiceProblem: "select * from plass_problem_multiplechoice where name = ? and content = ?",
    selectCategoryFromMultiProblems: "select * from plass_total_categories where id = (select category_id FROM plass_problem_multiplechoice_category where problem_id = ?)" ,
    selectMultiProblems: "select * from plass_problem_multiplechoice",
    selectMultiChoiceProblemById: "select * from plass_problem_multiplechoice where id =?",
    selectCategoryFromMultiProblemId: "select * from plass_total_categories where id = (select category_id FROM plass_problem_multiplechoice_category where problem_id = ?)",
    selectMultiChoiceSubmit: "select * from plass_problem_multiplechoice_submit where user_id = ? and problem_id = ?",
    selectSubmitMultiChoiceProblem: "select * from plass_problem_multiplechoice_answer where problem_id =? and id = ?",
    getCountMultiChoiceProblem: "SELECT COUNT(id) as count FROM plass_problem_multiplechoice",
    selectMultiChoiceSubmitByUserId: "SELECT * FROM plass_problem_multiplechoice_submit where user_id = ?",    
    //SHORTANS PROBLEM
    selectShortProblem: "select * from plass_problem_shortans where name = ? and content = ?",
    getMyListProblem: "select mp.*, p.name, p.content from plass_mylist_problem as mp, plass_problems as p where mp.user_id = ? and mp.problem_id = p.id and problem_type = 1 UNION ALL select mp.*, p.name, p.content from plass_mylist_problem as mp, plass_problem_multiplechoice as p where mp.user_id = ? and mp.problem_id = p.id and problem_type = 2 UNION ALL select mp.*, p.name, p.content from plass_mylist_problem as mp, plass_problem_shortans AS p where mp.user_id = ? and mp.problem_id = p.id and problem_type = 3 ORDER BY id ASC",
    selectCategoryFromShortantsProblems: "select * from plass_total_categories where id = (select category_id FROM plass_problem_shortanswer_category where problem_id = ?)" ,
    selectShortansProblems: "select * from plass_problem_shortans",
    selectAnswerByShortansPro: "select * from plass_problem_shortans_answer where problem_id = ?",
    selectShortProblemById: "select * from plass_problem_shortans where id = ?",
    //selectTestCaseByProblemId: `select id, input_example as input, output_example as output from plass_testcases where problem_id = ?`,
    getCountShortProblem: "SELECT COUNT(id) as count FROM plass_problem_shortans",
    selectShortansSubmit: "SELECT * FROM plass_problem_shortans_submit where user_id = ?",
    selectShortansSubmitByUserProblem: "SELECT * FROM plass_problem_shortans_submit where user_id = ? and problem_id = ?",

    //OTHER
    checkLikeProblem: "select * from plass_mylist_problem where user_id = ? and problem_id = ?",
    setProblemMyList: "insert into plass_mylist_problem(user_id, problem_id, problem_type) values (?, ?, ?)",
    
	
       //Category Imp
    selectImpMulti : "select problem_id,timestamp from plass_problem_multiplechoice_submit WHERE (( problem_id BETWEEN 1 AND 22) OR (problem_id BETWEEN 24 AND 26) OR (problem_id BETWEEN 28 AND 30) OR (problem_id BETWEEN 33 AND 50 )) AND answer_status = 'true' AND user_id = ?" ,
    selectImpShort : "select problem_id,timstamp from plass_problem_shortans_submit where ((problem_id BETWEEN 1 AND 4) OR (problem_id BETWEEN 7 AND 13) OR (problem_id BETWEEN 15 AND 20) OR (problem_id BETWEEN 22 AND 24) OR (problem_id BETWEEN 26 AND 36) OR (problem_id BETWEEN 38 AND 45)) AND answer_status = 1 AND user_id = ?",
    selectImpProg : "select problem_id,timestamp from plass_problem_submit where ((problem_id BETWEEN 1 AND 4) OR (problem_id BETWEEN 11 AND 22) OR (problem_id BETWEEN 25 AND 26) OR (problem_id BETWEEN 29 AND 30 ) OR (problem_id = 33) OR (problem_id BETWEEN 39 AND 40) OR (problem_id = 43) OR  (problem_id BETWEEN 48 AND 50)) AND answer_status = 1 AND user_id = ?",
    //Category Math
    selectMathMulti : "select problem_id,timestamp from plass_problem_multiplechoice_submit WHERE ((problem_id = 23) or (problem_id = 27)) AND answer_status = 'true' AND user_id = ?",
    selectMathShort : "select problem_id,timstamp from plass_problem_shortans_submit where (problem_id = 14)  AND answer_status = 1 AND user_id = ?",
    selectMathProg : "select problem_id,timestamp from plass_problem_submit where ((problem_id = 24 ) OR (problem_id BETWEEN 27 AND 28) OR (problem_id BETWEEN 41 AND 42)OR (problem_id BETWEEN 44 AND 47)) AND answer_status = 1 AND user_id = ?",
    //Category String
    selectStrMulti : "select problem_id,timestamp from plass_problem_multiplechoice_submit where problem_id = 500",
    selectStrShort : "select problem_id,timstamp from plass_problem_shortans_submit where ((problem_id BETWEEN 5 AND 6) or (problem_id = 21)or (problem_id = 25) or (problem_id = 37)) AND answer_status = 1 AND user_id = ?",
    selectStrProg : "select problem_id,timestamp from plass_problem_submit where ((problem_id BETWEEN 9 AND 10) OR (problem_id = 32) or (problem_id BETWEEN 36 AND 37)) AND answer_status = 1 AND user_id = ?",
    //Category Data Structure
    selectDataMulti: "select problem_id,timestamp from plass_problem_multiplechoice_submit WHERE (problem_id BETWEEN 31 AND 32 ) AND answer_status = 'true' AND user_id = ?",
    selectDataShort: "select problem_id,timstamp from plass_problem_shortans_submit where (problem_id = 50) AND answer_status = 1 AND user_id = ? ",
    selectDataProg : "select problem_id,timestamp from plass_problem_submit where ((problem_id BETWEEN 5 AND 8) OR ( problem_id  = 32) OR (problem_id = 31) OR (problem_id BETWEEN 34 AND 35))  AND answer_status = 1 AND user_id = ? ",
    //Category Algorithm
    selectAlgoMulti : "select problem_id,timestamp from plass_problem_multiplechoice_submit where problem_id = 500",
    selectAlgoShort : "select problem_id,timstamp from plass_problem_shortans_submit where (problem_id BETWEEN 46 AND 49) AND answer_status = 1 AND user_id = ? ",
    selectAlgoProg : "select problem_id,timestamp from plass_problem_submit where (problem_id = 38)AND answer_status = 1 AND user_id = ? ",
    

//전체 문제에 대한 정,오답률
    selectCorr: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) GROUP BY s.problem_id order by AVG(answer_status) desc",
    

    selectInco: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) GROUP BY s.problem_id order by AVG(answer_status) asc",
    
    //implementation에 대한 정,오답률
    selectCorrImp: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND ((s.problem_id BETWEEN 1 AND 4) OR (s.problem_id BETWEEN 11 AND 22) OR (s.problem_id BETWEEN 25 AND 26) OR (problem_id BETWEEN 29 AND 30 ) OR (s.problem_id = 33) OR (s.problem_id BETWEEN 39 AND 40) OR (s.problem_id = 43) OR  (s.problem_id BETWEEN 48 AND 50)) GROUP BY s.problem_id order by AVG(answer_status) desc",
    

    selectIncoImp: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND ((s.problem_id BETWEEN 1 AND 4) OR (s.problem_id BETWEEN 11 AND 22) OR (s.problem_id BETWEEN 25 AND 26) OR (problem_id BETWEEN 29 AND 30 ) OR (s.problem_id = 33) OR (s.problem_id BETWEEN 39 AND 40) OR (s.problem_id = 43) OR  (s.problem_id BETWEEN 48 AND 50)) GROUP BY s.problem_id order by AVG(answer_status) asc",
    
    //Math에 대한 정,오답률
    selectCorrMath: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND ((s.problem_id = 24 ) OR (s.problem_id BETWEEN 27 AND 28) OR (s.problem_id BETWEEN 41 AND 42)OR (s.problem_id BETWEEN 44 AND 47)) GROUP BY s.problem_id order by AVG(answer_status) desc",
     
    
    selectIncoMath: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND ((s.problem_id = 24 ) OR (s.problem_id BETWEEN 27 AND 28) OR (s.problem_id BETWEEN 41 AND 42)OR (s.problem_id BETWEEN 44 AND 47)) GROUP BY s.problem_id order by AVG(answer_status) asc",
      
    //Str에 대한 정,오답률
    selectCorrStr: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND ((s.problem_id BETWEEN 9 AND 10) OR (s.problem_id = 32) OR (s.problem_id BETWEEN 36 AND 37)) GROUP BY s.problem_id order by AVG(answer_status) desc",
    
    
    selectIncoStr: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND ((s.problem_id BETWEEN 9 AND 10) OR (s.problem_id = 32) OR (s.problem_id BETWEEN 36 AND 37))  GROUP BY s.problem_id order by AVG(answer_status) asc",
    
    //Data Structure에 대한 정,오답률
    selectCorrData: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND ((s.problem_id BETWEEN 5 AND 8) OR (s.problem_id  = 32) OR (s.problem_id = 31) OR (s.problem_id BETWEEN 34 AND 35))  GROUP BY s.problem_id order by AVG(answer_status) desc",
    
    
    selectIncoData: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND ((s.problem_id BETWEEN 5 AND 8) OR (s.problem_id  = 32) OR (s.problem_id = 31) OR (s.problem_id BETWEEN 34 AND 35))  GROUP BY s.problem_id order by AVG(answer_status) asc",
    
    //Algorithm에 대한 정,오답률
    selectCorrAlgo: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND (s.problem_id = 38)  GROUP BY s.problem_id order by AVG(answer_status) desc",
    
    
    selectIncoAlgo: "SELECT s.problem_id AS pp ,  p.name AS nn , AVG(s.answer_status)*100 AS aa FROM plass_problem_submit AS s JOIN plass_problems AS p WHERE (s.problem_id = p.id) AND (s.problem_id = 38)  GROUP BY s.problem_id order by AVG(answer_status) asc",

   
    selectProblemDate: "SELECT a AS date , sum(b) AS problems from (SELECT Date_format(TIMESTAMP,'%Y-%m-%d') AS a , count(Date_format(TIMESTAMP,'%Y-%m-%d')) AS b FROM plass_problem_multiplechoice_submit GROUP BY a UNION ALL  SELECT Date_format(TIMSTAMP,'%Y-%m-%d'),count(Date_format(TIMSTAMP,'%Y-%m-%d')) FROM plass_problem_shortans_submit GROUP BY Date_format(TIMSTAMP,'%Y-%m-%d') UNION ALL  Select Date_format(TIMESTAMP,'%Y-%m-%d'),count(Date_format(TIMESTAMP,'%Y-%m-%d')) from plass_problem_submit GROUP BY Date_format(TIMESTAMP,'%Y-%m-%d')) bb GROUP BY a ORDER BY a desc ",	

    //==================INSERT==================== 
    //PROBLEM
    insertProblemTag: "insert into plass_problem_category(problem_id, category_id) values (?, ?)",
    insertTestCase: "insert into plass_testcases input_example =?,output_example =?, problem_id = ? where id= ?",
    insertProblemSubmit: "insert into plass_problem_submit(user_id, problem_id, language_id, answer_status, status, path, times) values (?,?,?,?,?,?,?)",

    //MULTICHOICE PROBLEM
    insertMultiChoiceProblem: "insert into plass_problem_multiplechoice(name, content, level) values(?, ?, ?)",
    insertMultiChoiceProblemTag: "insert into plass_problem_multiplechoice_category(problem_id, category_id) values(?, ?)",
    insertMultiChoiceSubmit: "insert into plass_problem_multiplechoice_submit(user_id, problem_id, answer_status, answer_id) values (?, ?, ?, ?)",
    
    //SHORTANS PROBLEM
    insertShortProblem: "insert into plass_problem_shortans(name, content, level) values(?, ?, ?)",
    insertShortProblemTag: "insert into plass_problem_shortanswer_category (problem_id, category_id) values(?, ?)",
    insertShortSubmit: "insert into plass_problem_shortans_submit(user_id, problem_id, answer_status, content) values(?,?,?,?)",


    //==================UPDATE====================
    //PROBLEM
    updateProblem: "update plass_problems set name = ?, content = ?,  input = ?, output =?, level = ?  where id = ?",
    updateTestCaseProblem: "update plass_testcases set input_example = ?, output_example =? where problem_id =?",
    updateProblemTag: "update plass_problem_category  set  category_id = ? where problem_id = ?",
    updateProblemSubmit: "update plass_problem_submit set  language_id = ?, answer_status = ? , status = ?, path = ? where problem_id = ? and user_id = ?",
    //MULTICHOICE PROBLEM
    updateMultiChoiceProblem:`update plass_problem_multiplechoice set name = ?, content =?, level =? where id = ?`,
    // update plass_problems_multiplechoice_answer set problem_id = ?, answer_content = ?, is_correct where id = ?;
    // update plass_problems_multiplechoice_category set problem_id = ?, category_id = ? where id = ?`,
    updateMultiChoiceProblemTag: "UPDATE plass_problem_multiplechoice_category SET category_id = ? WHERE problem_id = ?",
    updateMultiChoiceSubmit: "update plass_problem_multiplechoice_submit set answer_status = ?, answer = ? WHERE problem_id = ? and user_id = ?",
    //SHORTANS PROBLEM
    updateShortansProblem: "update plass_problem_shortans set name = ?, content = ?, level = ? where id = ?",
    updateShortansTag: "update plass_problem_shortanswer_category set  category_id = ? where problem_id = ?",
    updateShortansSubmit: "update plass_problem_shortans_submit set answer_status = ?, content = ? where user_id = ? and problem_id = ?",
    //==================DELETE====================
    //PROBLEM
 
    deleteTestCaseProblem: "delete from plass_testcases where problem_id = ?",
    deleteCategoryProblem: "delete from plass_problem_category where problem_id = ?",
    deleteProblem : "delete from plass_problems where id = ?",

    //MULTICHOICE PROBLEM
    deleteMultiChoiceProblem : "delete from plass_problem_multiplechoice where id = ?",
    //deleteAnswerMultiChoieProblem: "delete from plass_problem_multiplechoice_answer where problem_id = ?",
    deleteMultiChoiceCategoryProblem: "delete from plass_problem_multiplechoice_category where problem_id = ?",
    deleteAnswerMultiChoieProblem: "delete from plass_problem_multiplechoice_answer where problem_id = ?",
    deleteMultiChoiceCategoryProblem: "delete from plass_problem_multiplechoice_category where problem_id = ?",
    
    //SHORTANS PROBLEM
    deleteShortansProblem : "delete from plass_problem_shortans where id = ? ",
    deleteAnswerShortansProblem: "delete from plass_problem_shortans_answer where problem_id = ?",
    deleteShortansCategoryProblem: "delete from plass_problem_shortanswer_category where problem_id = ?",

    //OTHER
    removeProblemMyList: "delete from plass_mylist_problem where user_id = ? and problem_id = ? and problem_type = ?",
    deleleMyProblem : "delete from plass_mylist_problem where id = ?",
    
    //==================JOIN====================
    joinCategoryLevelProblem_coding : "select S.problem_id, S.answer_status, S.timestamp, C.category_id, P.level, P.name from plass_problem_submit S left outer join plass_problem_category C ON S.problem_id = C.problem_id left outer join plass_problems P ON S.problem_id = P.id WHERE user_id = ?",
    joinCategoryLevelProblem_mul : "select S.problem_id, S.answer_status, S.timestamp, C.category_id, P.level, P.name from plass_problem_multiplechoice_submit S left outer join plass_problem_multiplechoice_category C ON S.problem_id = C.problem_id left outer join plass_problem_multiplechoice P ON S.problem_id = P.id where user_id = ?",
    joinCategoryLevelProblem_shortans : "select S.problem_id, S.answer_status, S.timstamp, C.category_id, P.level, P.name from plass_problem_shortans_submit S left outer join plass_problem_shortanswer_category C ON S.problem_id = C.problem_id left outer join plass_problem_shortans P ON S.problem_id = P.id where user_id = ?",
 
    //==================HEATMAP====================
    countTime : "select DATE_FORMAT(U.submit_time, '%Y/%m/%d') AS submit_time2, SUM(cnt) AS cnt FROM( SELECT DATE_FORMAT(S.timestamp, '%Y/%m/%d') AS submit_time, COUNT(*) AS cnt from plass_problem_submit S left outer join plass_problem_category C ON S.problem_id = C.problem_id left outer join plass_problems P ON S.problem_id = P.id WHERE S.answer_status=1 AND S.user_id=? GROUP BY submit_time UNION ALL select DATE_FORMAT(S.timestamp, '%Y/%m/%d') AS submit_time, COUNT(*) AS cnt from plass_problem_multiplechoice_submit S left outer join plass_problem_multiplechoice_category C ON S.problem_id = C.problem_id left outer join plass_problem_multiplechoice P ON S.problem_id = P.id WHERE S.answer_status='true' AND S.user_id=? GROUP BY submit_time UNION ALL select DATE_FORMAT(S.timstamp, '%Y/%m/%d') AS submit_time, COUNT(*) AS cnt from plass_problem_shortans_submit S left outer join plass_problem_shortanswer_category C ON S.problem_id = C.problem_id left outer join plass_problem_shortans P ON S.problem_id = P.id WHERE S.answer_status=1 AND S.user_id=? GROUP BY submit_time )AS U GROUP BY submit_time2 ORDER BY submit_time2 asc;",
    conTime : "SELECT MAX(con_days) AS maxcon FROM( SELECT COUNT(*) AS con_days FROM( SELECT BB.*, BB.RNUM+BB.diff_day AS CON_DAY FROM( SELECT AA.* , @rownum := @rownum+1 AS RNUM, TIMESTAMPDIFF(DAY, submit_time2, '20211103') AS diff_day FROM( select DATE_FORMAT(UU.submit_time, '%Y/%m/%d') AS submit_time2, SUM(cnt) AS cnt FROM( select DATE_FORMAT(S.timestamp, '%Y/%m/%d') AS submit_time, COUNT(*) AS cnt from plass_problem_submit S left outer join plass_problem_category C ON S.problem_id = C.problem_id left outer join plass_problems P ON S.problem_id = P.id WHERE S.user_id=? AND S.answer_status=1 GROUP BY DATE_FORMAT(S.timestamp, '%Y/%m/%d') UNION ALL select DATE_FORMAT(S.timestamp, '%Y/%m/%d') AS submit_time, COUNT(*) AS cnt from plass_problem_multiplechoice_submit S left outer join plass_problem_multiplechoice_category C ON S.problem_id = C.problem_id left outer join plass_problem_multiplechoice P ON S.problem_id = P.id WHERE S.user_id=? AND S.answer_status='true' GROUP BY DATE_FORMAT(S.timestamp, '%Y/%m/%d') UNION all select DATE_FORMAT(S.timstamp, '%Y/%m/%d') AS submit_time, COUNT(*) AS cnt from plass_problem_shortans_submit S left outer join plass_problem_shortanswer_category C ON S.problem_id = C.problem_id left outer join plass_problem_shortans P ON S.problem_id = P.id WHERE S.user_id=? AND S.answer_status=1 GROUP BY DATE_FORMAT(S.timstamp, '%Y/%m/%d') )AS UU GROUP BY DATE_FORMAT(UU.submit_time, '%Y/%m/%d') ORDER BY submit_time2 ASC ) AS AA , (SELECT @rownum := 0) R ) AS BB )AS CC GROUP BY CON_DAY ORDER BY con_days DESC )AS DD",

    //=================RANK=====================
    getRankAll : "SELECT user_id, u.username, count_ans_all FROM(SELECT user_id, COUNT(answer_status) AS count_ans_all FROM(SELECT user_id, answer_status FROM plass_problem_submit WHERE answer_status = 1 UNION ALL SELECT user_id, answer_status FROM plass_problem_multiplechoice_submit WHERE answer_status = 'true' UNION ALL SELECT user_id, answer_status FROM plass_problem_shortans_submit WHERE answer_status = 1) AS a GROUP BY user_id ORDER BY count_ans_all DESC) AS b LEFT JOIN plass_user u ON user_id=u.id limit 8",
    getRankCoding : "SELECT s.user_id, u.username, COUNT(s.answer_status) AS count_ans_coding FROM plass_problem_submit s LEFT OUTER JOIN plass_user u ON s.user_id = u.id WHERE answer_status = 1 GROUP BY user_id ORDER BY count_ans_coding DESC LIMIT 8",
    getRankMul : "SELECT s.user_id, u.username, COUNT(s.answer_status) AS count_ans_mul FROM plass_problem_multiplechoice_submit s LEFT OUTER JOIN plass_user u ON s.user_id = u.id WHERE answer_status = 'true' GROUP BY user_id ORDER BY count_ans_mul DESC LIMIT 8",
    getRankShort : "SELECT s.user_id, u.username, COUNT(s.answer_status) AS count_ans_short FROM plass_problem_shortans_submit s LEFT OUTER JOIN plass_user u ON s.user_id = u.id WHERE answer_status = 1 GROUP BY user_id ORDER BY count_ans_short DESC LIMIT 8",
    
    //=================LEVEL================
    isCorrectLevel : "SELECT COUNT(*) AS iscorrect_cnt, LEVEL FROM(SELECT S.id, P.level from plass_problem_submit S left outer join plass_problems P ON S.problem_id = P.id WHERE answer_status=1 UNION ALL SELECT S.id, P.level from plass_problem_multiplechoice_submit S left outer join plass_problem_multiplechoice P ON S.problem_id = P.id WHERE answer_status='true' UNION ALL SELECT S.id, P.level from plass_problem_shortans_submit S left outer join plass_problem_shortans P ON S.problem_id = P.id WHERE answer_status=1) AS a GROUP BY LEVEL order by level desc",
    noCorrectLevel : "SELECT COUNT(*) AS nocorrect_cnt, LEVEL FROM(SELECT S.id, P.level from plass_problem_submit S left outer join plass_problems P ON S.problem_id = P.id WHERE answer_status=0 UNION ALL SELECT S.id, P.level from plass_problem_multiplechoice_submit S left outer join plass_problem_multiplechoice P ON S.problem_id = P.id WHERE answer_status='false' UNION ALL SELECT S.id, P.level from plass_problem_shortans_submit S left outer join plass_problem_shortans P ON S.problem_id = P.id WHERE answer_status=0) AS a GROUP BY LEVEL order by level desc",

    //================problem count=======
    getCodingCount : "select count(*) as coding_cnt from plass_problems",
    getMulCount : "select count(*) as mul_cnt from plass_problem_multiplechoice",
    getShortCount : "select count(*) as short_cnt from plass_problem_shortans",
    
}
