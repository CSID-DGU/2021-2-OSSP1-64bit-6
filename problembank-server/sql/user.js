module.exports = {
    getUserById : 'select * from plass_user where id = ?',
    //=======user count
    selectUserDay : 'select id, user_cnt, DATE_FORMAT(input_date, "%e") AS day FROM plass_user_count WHERE id = ?',
    selectUserCnt : 'SELECT COUNT(*) as user_cnt from plass_user',
    updateUserCnt : 'update plass_user_count set user_cnt = ?, input_date=? where id=?',
    //=======visitor count
    selectVisitorDay : 'select id, visitor_cnt, date_format(input_date, "%e") as day from plass_visitor_count where id = ?',
    updateVisitorCnt : 'update plass_visitor_count set visitor_cnt = ?, input_date=? where id=?',
    selectVisitorAll : 'SELECT id, visitor_cnt, date_add(input_date, INTERVAL 9 HOUR) as input_date FROM plass_visitor_count',
}
