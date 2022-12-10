const { OralceConnector } = require('../oracle-connector')

class Search extends OralceConnector{
    constructor(){
        super();
    }

    async get_search_list(keyword){
        const sql = "SELECT ROWNUM as seqnum, player_info.* FROM player_info WHERE playername LIKE :keyword";
        const bucket = {
            keyword : `%${keyword}%`
        }
        return this.execute(sql,bucket);
    }

    async get_player_list_pagination(keyword,pagination_start,unit = 10){
        // const sql = "SELECT * FROM (SELECT ROWNUM as seqnum, player_info.* FROM player_info WHERE playername LIKE :keyword) WHERE seqnum BETWEEN :range_start AND :range_end";
        const sql = "SELECT * FROM (SELECT ROWNUM as seqnum, player_info.* FROM player_info WHERE playername LIKE :keyword) OFFSET :range_start ROWS FETCH NEXT :unit ROWS ONLY"
        const bucket = {
            keyword : `%${keyword}%`,
            range_start : pagination_start,
            unit
        }
        return this.execute(sql,bucket);
    }

    async get_team_name(teamid){
        const sql = "SELECT teamname FROM team_info WHERE teamid=:teamid";
        const bucket = {
            teamid
        }
        return this.execute(sql,bucket);
    }
}

module.exports = Search