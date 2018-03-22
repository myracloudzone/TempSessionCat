
/*
 * GET users listing.
 */

var async = require('async');
var moment = require('moment');
var forEach = require('async-foreach').forEach;
var rn = require('random-number');

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
    if(querySearch.dates != null && querySearch.dates.length > 0) {
        var q = " and ("
        forEach(querySearch.dates, function(item, index, arr) {
            var start = (new Date(item)).getTime();
            var end = (new Date(item));
            end.setHours(23);
            end.setMinutes(59);
            end.setSeconds(59);
            end = end.getTime();
            q = q + ' (s.startTime >= '+start+' and s.startTime <= '+end+') '
            if(index != querySearch.dates.length -1) {
                if(index == 0 && querySearch.dates.length > 1) {
                    q = q + ' or '
                } else if(index != querySearch.dates.length -1) {
                    q = q + ' or '  
                }
                
            }
        });
        q = q + ' )';
        console.log(q);
        query = query + q;
    }
    console.log(query);
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
                    var max = 0;
                    async.mapSeries(dataBlock, function(val, next) {
                        console.log(val);
                        var q = 'select * FROM sessionsCat.Speaker_To_Session sts left join sessionsCat.speaker s on s.speakerId = sts.speakerId where sts.sessionId = '+val.id;
                        if(val.duration > max) {
                            max = val.duration;
                        }
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
					   res.send({data:response, maxDuration : max}); 
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

exports.speakerSesssion = function(req, res) {
  req.getConnection(function(err,connection) {
        var q = "select * from sessionsCat.session s inner join sessionsCat.Speaker_To_Session sts on (sts.sessionId = s.id) where sts.speakerId = "+req.query.speakerId;
        var query = connection.query(q,function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
                res.send({data:rows});
         });
    });
};
exports.distinctDates = function(req, res) {
  req.getConnection(function(err,connection) {
        var q = "SELECT distinct from_unixtime(startTime/1000,'%Y-%m-%d') as distinctDate from sessionsCat.session;";
        var query = connection.query(q,function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
                var data = [];
                async.mapSeries(rows, function(val, next) {
                    var d = {};
                    console.log(val)
                    d.id = val.distinctDate;
                    d.name =val.distinctDate;
                    data.push(d);
                    next();
                }, function (err, result) {
				   res.send({data:data});
				});
                
         });
    });
};

exports.setDates = function(req, res) {
  req.getConnection(function(err,connection) {
      var ids = [];
      var ldt = 1520823444000;
      
      var query = connection.query('select id from sessionsCat.session',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
            async.mapSeries(rows, function(val, next) {
                ids.push(val.id);
                next();
            }, function (err, result) {
                async.mapSeries(ids, function(vid, nextId) {
                    var s = ldt + (180*60*1000);
                    var e = s + (getMin()*60*1000);
                    ldt = e;
                    connection.query("update sessionsCat.session set startTime ="+s+", endTime="+e+" where id = "+vid ,function(err,rows) {
                        if(err)
                            console.log("Error Selecting : %s ",err );
                        nextId();
                    });
                }, function (err, result) {
                    res.send("Saved");
                });
            });        
      });
  });
};

function getMin() {
    var values = [0,15,30,45,60];
    var options = {
        min:  0, max:  4, integer: true
    }
    var index = rn(options);
    return values[index];
}









