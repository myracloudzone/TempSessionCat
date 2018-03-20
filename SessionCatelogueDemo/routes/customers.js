
/*
 * GET users listing.
 */

var async = require('async');

exports.list = function(req, res){
  console.log(req.query)
    var querySearch = {};
    if(req.query.request != null) {
        querySearch = JSON.parse(req.query.request);
    }
    var query = "select s.id, s.isFav, s.name, tg.id as tagId, tg.name as tagName, type.id as typeId, type.name as typeName, s.code, startTime, endTime, duration, description, l.id as levelId, l.name as levelName, l.color as levelColor, lc.id as locationId, lc.name as locationName, lc.color as locationColor, st.id as statusId, st.name as statusName, st.color as statusColor, tr.name as trackName, tr.id  as trackId, tr.color as trackColor from sessionsCat.session s left join sessionsCat.Level l on l.id = s.sessionLevel  left join sessionsCat.Location lc on lc.id = s.sessionLocation left join   sessionsCat.Status st on st.id = s.sessionStatus  left join sessionsCat.Track tr on tr.id = s.sessionTrack left join sessionsCat.tag_to_session tts on tts.sessionId = s.id left join sessionsCat.Tag tg on tts.tagId = tg.id left join Type type on type.id = s.sessionType where 1=1"
    if(querySearch.sessionLevel != null && querySearch.sessionLevel.length > 0) {
        query = query + " and s.sessionLevel in ("+querySearch.sessionLevel.toString()+")";
    }
    if(querySearch.sessionLocation != null && querySearch.sessionLocation.length > 0) {
       query = query + " and s.sessionLocation in ("+querySearch.sessionLocation.toString()+")"; 
    }
    if(querySearch.sessionStatus != null && querySearch.sessionStatus.length > 0) {
        query = query + " and s.sessionStatus in ("+querySearch.sessionStatus.toString()+")"; 
    }
    if(querySearch.sessionTag != null && querySearch.sessionTag.length > 0) {
        query = query + " and tts.tagId in ("+querySearch.sessionTag.toString()+")"; 
    }
    if(querySearch.sessionTrack != null && querySearch.sessionTrack.length > 0) {
        query = query + " and s.sessionTrack in ("+querySearch.sessionTrack.toString()+")"; 
    }
    if(querySearch.sessionType != null && querySearch.sessionType.length > 0) {
        query = query + " and s.sessionType in ("+querySearch.sessionType.toString()+")"; 
    }
    if(querySearch.term != null && querySearch.term != '') {
        query = query + " and (s.name like '%"+querySearch.term+"%' or s.code like '%"+querySearch.term+"%'"
    }
    req.getConnection(function(err,connection){
        var query1 = connection.query(query, function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
                var uniqueTagIds = [];
                var uniqueSpeakerIds = [];
                var dataBlock = {};
                async.mapSeries(rows, function (row, cb) {
					if(dataBlock[row.id] == null) {
                        var data = {};
                        data.id = row.id;
                        data.name = row.name;
                        data.code = row.code;
                        data.startTime = row.startTime;
                        data.endTime = row.endTime;
                        data.duration = row.duration;
                        data.description = row.description;
                        data.levelId = row.levelId;
                        data.levelName = row.levelName;
                        data.levelColor = row.levelColor;
                        data.locationId = row.locationId;
                        data.locationName = row.locationName;
                        data.statusId = row.statusId;
                        data.statusName = row.statusName;
                        data.trackName = row.trackName;
                        data.trackId = row.trackId;
                        data.typeId = row.typeId;
                        data.typeName = row.typeName;
                        data.trackColor = row.trackColor;
                        data.isFav = row.isFav;
                        if(row.tagId == null || row.tagId == '') {
                            data.tags = [];
                        } 
                        if(row.tagId != null || row.tagId != '') {
                            var tagData = {};
                            tagData.id = row.tagId;
                            tagData.name = row.tagName;
                            data.tags = [];
                            data.tags.push(tagData);
                        }
                        dataBlock[data.id] = data;
                    } else {
                        var prevData = dataBlock[row.id];
                        var tagData = {};
                        tagData.id = row.tagId;
                        tagData.name = row.tagName;
                        prevData.tags.push(tagData);
                        dataBlock[row.id] = prevData;
                    }
                    cb();
				}, function (err, result) {
//                    console.log(dataBlock);
                    var response = [];
                    async.mapSeries(dataBlock, function(val, next) {
                        console.log(val);
                        var q = 'select * FROM sessionsCat.Speaker_To_Session sts left join sessionsCat.speaker s on s.speakerId = sts.speakerId where sts.sessionId = '+val.id;
                        console.log(q);
                        connection.query(q, function(err,rows) {
                            if(err) {
                                console.log(err);
                            } else {
                                val.speakers = [];
                                val.speakers = rows;
                            }
                            response.push(val);
                            next();
                        });
                    }, function (err, result) {
					   res.send({data:response}); 
				    });
				})
            
        
        });
    });
};

exports.tags = function(req, res) {
  req.getConnection(function(err,connection) {
        var query = connection.query('SELECT * FROM Tag',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.send({data:rows});
         });
    });
};

exports.levels = function(req, res) {
  req.getConnection(function(err,connection) {
        var query = connection.query('SELECT * FROM Level',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.send({data:rows});
         });
    });
};
exports.locations = function(req, res) {
  req.getConnection(function(err,connection) {
        var query = connection.query('SELECT * FROM Location',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.send({data:rows});
         });
    });
};
exports.status = function(req, res) {
  req.getConnection(function(err,connection) {
        var query = connection.query('SELECT * FROM Status',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.send({data:rows});
         });
    });
};
exports.tracks = function(req, res) {
  req.getConnection(function(err,connection) {
        var query = connection.query('SELECT * FROM Track',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.send({data:rows});
         });
    });
};
exports.types = function(req, res) {
  req.getConnection(function(err,connection) {
        var query = connection.query('SELECT * FROM Type',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.send({data:rows});
         });
    });
};



