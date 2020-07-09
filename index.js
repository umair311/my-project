const mysql=require('mysql');
var multer  = require('multer');
 var cors = require('cors');
const express=require('express');
const jwt = require('jsonwebtoken');
var app=express();
 app.use(cors());
const bodyparser=require('body-parser');

app.use(bodyparser.json());




var mysqlconnection=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'alumni'




});





var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});



function verifyToken(req,res,next){

    // if(!req.headers.authorization){
    //     return res.status(401).send('The user is  user')
    // }
    let token=req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('No token provide user')
    }
    
    let payload =jwt.verify(token,'secretkey')
    if(!payload)
    {
        return res.status(401).send('no Payload user')
    
    }
    req.id=payload.subject
    next();
    }


mysqlconnection.connect((err)=>{
    if(!err)
    {
        console.log('Database connection Succecded');
    }
    else{
        console.log('Database not connected\nError:'+JSON.stringify(err,undefined,2));
    }
    
    
    
    });
    app.listen(8081,()=>console.log('Express server is running on port no :8081'));
    
    //midleware token verification
    
    





//Api For Subjects

// get all subjects
    app.get('/subjects',(req,res)=>{
        console.log(req);
            mysqlconnection.query('SELECT * FROM subjects',(err,rows,fields)=>{
        
                
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //get a Subject
        app.get('/subject/:id',(req,res)=>{
        console.log(req);
        console.log(req);
            mysqlconnection.query('SELECT * FROM subjects WHERE id=?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //DELETE a Subject
        app.delete('/subject/:id',(req,res)=>{
            
        
            mysqlconnection.query('DELETE FROM teachers WHERE sid =? AND Deltet from subjects where id =?',[req.params.id,req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    
                    res.send("Successfuly deleted");
                }
                else
                console.log(err);
            })

            
        });
        
        
        //POST a Subject
        app.post('/subject',(req,res)=>{
        
        var sbjct = req.body.sbjct;
        
        
        // validation
        if (!sbjct)
            return res.status(400).send({ error:true, message: 'Please provide Subjct Detail' });
        
        // insert to db
        mysqlconnection.query("INSERT INTO subjects (sbjct) VALUES (?)", [sbjct], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Subject successfully added' });
        });
        
        });
        //put an employee
        app.put('/subject/:id',(req,res)=>{
            var sbjct=req.body.sbjct;
       
            
                mysqlconnection.query('UPDATE subjects SET sbjct=? WHERE id=?', [sbjct,req.params.id],(err,rows,fields)=>{
            
            
                    if(!err)
                    {
                        res.send("Successfuly Updated");
                    }
                    else
                    console.log('data not sent');
                });
        
        
            });




            
//Api For Degrees

// get all degrees
    app.get('/degrees', (req,res)=>{
        console.log(req);
            mysqlconnection.query('SELECT * FROM degree',(err,rows,fields)=>{
        
                
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //get a Degree
        app.get('/degree/:id',(req,res)=>{
        console.log(req);
        console.log(req);
            mysqlconnection.query('SELECT * FROM degree WHERE id=?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //DELETE a Degree
        app.delete('/degree/:id',(req,res)=>{
            
        
            mysqlconnection.query('DELETE FROM degree WHERE id =?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    
                    res.send("Successfuly deleted");
                }
                else
                console.log(err);
            });
        });
        
        
        //POST a Degree
        app.post('/degree',(req,res)=>{
        
        var name = req.body.name;
        
        
        // validation
        if (!name)
            return res.status(400).send({ error:true, message: 'Please provide Subjct Detail' });
        
        // insert to db
        mysqlconnection.query("INSERT INTO degree (name) VALUES (?)", [name], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Degree successfully added' });
        });
        
        });
        //put a Degree
        app.put('/degree/:id',(req,res)=>{
            var name=req.body.name;
       
            
                mysqlconnection.query('UPDATE degree SET name=? WHERE id=?', [name,req.params.id],(err,rows,fields)=>{
            
            
                    if(!err)
                    {
                        res.send("Successfuly Updated");
                    }
                    else
                    console.log('data not sent');
                })
        
        
            });












                       
//Api For profession

// get all professions
    app.get('/professions',(req,res)=>{
        console.log(req);
            mysqlconnection.query('SELECT * FROM profession',(err,rows,fields)=>{
        
                
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //get a profession
        app.get('/profession/:id',(req,res)=>{
        console.log(req);
        console.log(req);
            mysqlconnection.query('SELECT * FROM profession WHERE id=?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //DELETE a profession
        app.delete('/profession/:id',(req,res)=>{
            
        
            mysqlconnection.query('DELETE FROM profession WHERE id =?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    
                    res.send("Successfuly deleted");
                }
                else
                console.log(err);
            });
        });
        
        
        //POST a profession
        app.post('/profession',(req,res)=>{
        
        var profasn = req.body.profasn;
        
        
        // validation
        if (!profasn)
            return res.status(400).send({ error:true, message: 'Please provide Subjct Detail' });
        
        // insert to db
        mysqlconnection.query("INSERT INTO profession (profasn) VALUES (?)", [profasn], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Degree successfully added' });
        });
        
        });
        //put a profession
        app.put('/profession/:id',(req,res)=>{
            var profasn=req.body.profasn;
       
            
                mysqlconnection.query('UPDATE profession SET profasn=? WHERE id=?', [profasn,req.params.id],(err,rows,fields)=>{
            
            
                    if(!err)
                    {
                        res.send("Successfuly Updated");
                    }
                    else
                    console.log(err);
                })
        
        
            });






            
                       
//Api For Cities

// get all cities
    app.get('/cities',(req,res)=>{
        console.log(req);
            mysqlconnection.query('SELECT * FROM cities',(err,rows,fields)=>{
        
                
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //get a city
        app.get('/city/:id',(req,res)=>{
        
            mysqlconnection.query('SELECT * FROM cities WHERE id=?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //DELETE a city
        app.delete('/city/:id',(req,res)=>{
            
        
            mysqlconnection.query('DELETE FROM cities WHERE id =?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    
                    res.send("Successfuly deleted");
                }
                else
                console.log(err);
            });
        });
        
        
        //POST a city
        app.post('/city',(req,res)=>{
        
        var city = req.body.city;
        
        
        // validation
        if (!city)
            return res.status(400).send({ error:true, message: 'Please provide Subjct Detail' });
        
        // insert to db
        mysqlconnection.query("INSERT INTO cities (city) VALUES (?)", [city], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Degree successfully added' });
        });
        
        });
        //put a city
        app.put('/city/:id',(req,res)=>{
            var city=req.body.city;
       
            
                mysqlconnection.query('UPDATE cities SET city=? WHERE id=?', [city,req.params.id],(err,rows,fields)=>{
            
            
                    if(!err)
                    {
                        res.send("Successfuly Updated");
                    }
                    else
                    console.log(err);
                })
        
        
            });











                                
//Api For classes

// get all classes
    app.get('/classes',(req,res)=>{
        console.log(req);
            mysqlconnection.query('SELECT * FROM class',(err,rows,fields)=>{
        
                
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //get a class
        app.get('/class/:id',(req,res)=>{
        
            mysqlconnection.query('SELECT * FROM class WHERE id=?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //DELETE a class
        app.delete('/class/:id',(req,res)=>{
            
        
            mysqlconnection.query('DELETE FROM class WHERE id =?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    
                    res.send("Successfuly deleted");
                }
                else
                console.log(err);
            });
        });
        
        
        //POST a class
        app.post('/class',(req,res)=>{
        
        var clas = req.body.clas;
        
        
        // validation
        if (!clas)
            return res.status(400).send({ error:true, message: 'Please provide Subjct Detail' });
        
        // insert to db
        mysqlconnection.query("INSERT INTO class (clas) VALUES (?)", [clas], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Degree successfully added' });
        });
        
        });
        //put a class
        app.put('/class/:id',(req,res)=>{
            var clas=req.body.clas;
       
            
                mysqlconnection.query('UPDATE class SET clas=? WHERE id=?', [clas,req.params.id],(err,rows,fields)=>{
            
            
                    if(!err)
                    {
                        res.send("Successfuly Updated");
                    }
                    else
                    console.log(err);
                })
        
        
            });











            
//Api For Sessions

// get all Sessions
    app.get('/sessions',(req,res)=>{
        console.log(req);
            mysqlconnection.query('SELECT * FROM session',(err,rows,fields)=>{
        
                
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //get a session
        app.get('/session/:id',(req,res)=>{
        
            mysqlconnection.query('SELECT * FROM session WHERE id=?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    res.send(rows);
                }
                else
                console.log(err);
            })
        });
        //DELETE a session
        app.delete('/session/:id',(req,res)=>{
            
        
            mysqlconnection.query('DELETE FROM session WHERE id =?',[req.params.id],(err,rows,fields)=>{
        
        
                if(!err)
                {
                    
                    res.send("Successfuly deleted");
                }
                else
                console.log(err);
            });
        });
        
        
        //POST a session
        app.post('/session',(req,res)=>{
        
        var sesion = req.body.sesion;
        
        
        // validation
        if (!sesion)
            return res.status(400).send({ error:true, message: 'Please provide Session Detail' });
        
        // insert to db
        mysqlconnection.query("INSERT INTO session (sesion) VALUES (?)", [sesion], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Degree successfully added' });
        });
        
        });
        //put a session
        app.put('/session/:id',(req,res)=>{
            var sesion=req.body.sesion;
       
            
                mysqlconnection.query('UPDATE session SET sesion=? WHERE id=?', [sesion,req.params.id],(err,rows,fields)=>{
            
            
                    if(!err)
                    {
                        res.send("Successfuly Updated");
                    }
                    else
                    console.log(err);
                })
        
        
            });

            app.post('/event',upload.single('file'),function(req, res, next) {
                console.log(req.file);
                if(!req.file) {
                  res.status(500);
                  return next(err);
                }
                //res.json(req.file.filename );

                var des = req.body.description;
                var date = req.body.date;
                var time = req.body.time;
                var loc = req.body.location;
                var img = req.file.filename;
        
        
                // validation
              if(!img)
              {
                  res.send('Plz insert image');
              }
              else{
                // insert to db
                mysqlconnection.query("INSERT INTO events (img, description, date, time, location) VALUES (?,?,?,?,?)", [img,des,date,time,loc], function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'event successfully added' });
                });
            }
           
              });
// Get events

              app.get('/events',(req,res)=>{
                console.log(req);
                mysqlconnection.query('SELECT * FROM events',(err,rows,fields)=>{
                
                        
                        if(!err)
                        {
                            res.send(rows);
                        }
                        else
                        console.log(err);
                    })
                });




                app.get('/event/:id',(req,res)=>{
        
                    mysqlconnection.query('SELECT * FROM events WHERE id=?',[req.params.id],(err,rows,fields)=>{
                
                
                        if(!err)
                        {
                            res.send(rows);
                        }
                        else
                        console.log(err);
                    })
                });
                //DELETE a class
                app.delete('/event/:id',(req,res)=>{
                    
                
                    mysqlconnection.query('DELETE FROM events WHERE id =?',[req.params.id],(err,rows,fields)=>{
                
                
                        if(!err)
                        {
                            
                            res.send("Successfuly deleted");
                        }
                        else
                        console.log(err);
                    });
                });



                app.put('/event/:id',upload.single('file'),function(req, res, next){
                    if(!req.file) {
                        res.status(500);
                        return next(err);
                      }
                      //res.json(req.file.filename );
                      var img = req.file.filename;
                      var des = req.body.description;
                      var date = req.body.date;
                      var time = req.body.time;
                      var loc = req.body.location;
                     
              
               
                    
                        mysqlconnection.query('UPDATE events SET img=?, description=?, date=?, time=?, location=?  WHERE id=?', [img,des,date,time,loc,req.params.id],(err,rows,fields)=>{
                    
                    
                            if(!err)
                            {
                                res.send("Successfuly Updated");
                            }
                            else
                            console.log(err);
                        })
                
                
                    });

                    app.post('/login',(req,res)=>{
        
                        var username = req.body.username;
                        var passward = req.body.passward;
                        
                     mysqlconnection.query("SELECT *FROM login WHERE username=? AND passward=?", [username,passward], function (error, results, fields) {
                        
                            if (results.length > 0) {
                           let uid=results[0].id;
                                
                                
                            
                            if(results[0].usertype===1){
                               
                                    let payload={subject:results[0].id}
                                    let admintoken=jwt.sign(payload,'secretkey')
                                    //res.status(200).send({admintoken});
                                    data={
                                      admintoken,
                                       uid       
                                    }
                                 res.status(200).send(data);
                                 
                            }

                            if(results[0].usertype===2){
                                
                                let payload={subject:results[0].id}
                                let managertoken=jwt.sign(payload,'secretkey')
                               // res.status(200).send({managertoken});
                               data={
                                managertoken,
                                 uid       
                              }
                           res.status(200).send(data);
                                
                        }
                               
                                
                                
                              
                            } else {
                                res.send('Incorrect Username and/or Password!');
                            }			
                          res.end();
                                                                      });
                     
                        
                        });


                            //POST a Manager
        app.post('/manager',(req,res)=>{
        
        var fname = req.body.fname;
        var lname = req.body.lname;
        var username = req.body.username;
        var passward = req.body.passward;
     
        
        
        // // validation
        // if (!sesion)
        //     return res.status(400).send({ error:true, message: 'Please provide Session Detail' });
        
        // insert to db
        mysqlconnection.query("INSERT INTO login (fname,lname,username,passward,usertype) VALUES (?,?,?,?,2)", [fname,lname,username,passward], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Degree successfully added' });
        });
        
        });

        //get managers
        app.get('/manager',(req,res)=>{
        
            
           
         
            mysqlconnection.query("SELECT *FROM login ", function (error, results, fields) {
                if (error) throw error;
                return res.send(results);
            });
            
            });
             //get managers
        app.get('/manager/:id',(req,res)=>{
        
            
           
         
            mysqlconnection.query("SELECT *FROM login where id =? ",[req.params.id], function (error, results, fields) {
                if (error) throw error;
                return res.send(results);
            });
            
            });
            //Delete manager
            app.delete('/manager/:id',(req,res)=>{
        
            
           
         
            mysqlconnection.query("DELETE FROM login where id =? ",[req.params.id], function (error, results, fields) {
                if (error) throw error;
                return res.send("data deleted successfuly");
            });
            
            });

            app.put('/manager/:id',(req,res)=>{
        
                var fname = req.body.fname;
                var lname = req.body.lname;
                var username = req.body.username;
                var passward = req.body.passward;
                mysqlconnection.query("UPDATE login SET fname=?,lname=?,username=?,passward=? where id=?",[fname,lname,username,passward,req.params.id], function (error, results, fields) {
                    if (error) throw error;
                    return res.send("data Updated successfuly");
                });
                
                });














                app.post('/student',upload.single('file'),function(req, res, next) {
                   
                   
                    var fname = req.body.fname;
                    var lname = req.body.lname;
                    var phone = req.body.phone;
                    var email = req.body.email;
                    var password = req.body.password;
                    var cnic = req.body.cnic;
                    var dob = req.body.dob;
                    var sesstart = req.body.sesstart;
                    var sesend = req.body.sesend;
                    var gender = req.body.gender;
                    var enrolschool = req.body.enrolschool;
                    var leaveschool = req.body.leaveschool;
                    var permanentcity = req.body.permanentcity;
                    var cruntcity = req.body.cruntcity;
                    var hieghestdegree = req.body.hieghestdegree;
                    var profession = req.body.profession;
                    var file = req.file.filename;
                    var awards = req.body.awards;
                    var dist = req.body.dist;
            
            
            
                  
                 
                 
                    // insert to db
                    mysqlconnection.query("INSERT INTO student(fname,lname,phone,email,password,cnic,dob,sesstart,sesend,gender,enrolschool,leaveschool,permanentcity,cruntcity,hieghestdegree,profession,img,awards,distiniction)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [fname,lname,phone,email,password,cnic,dob,sesstart,sesend,gender,enrolschool,leaveschool,permanentcity,cruntcity,hieghestdegree,profession,file,awards,dist], function (error, results, fields) {
                        if (error) throw error;
                        return res.send({ error: false, data: results, message: 'Successfuly Signup' });
                    });
               
               
                  });


                  app.put('/student/:id',upload.single('file'),function(req, res, next) {
                   
                   
                    var fname = req.body.fname;
                    var lname = req.body.lname;
                    var phone = req.body.phone;
                    var email = req.body.email;
                    var password = req.body.password;
                    var cnic = req.body.cnic;
                    var dob = req.body.dob;
                    var sesstart = req.body.sesstart;
                    var sesend = req.body.sesend;
                    var gender = req.body.gender;
                    var enrolschool = req.body.enrolschool;
                    var leaveschool = req.body.leaveschool;
                    var permanentcity = req.body.permanentcity;
                    var cruntcity = req.body.cruntcity;
                    var hieghestdegree = req.body.hieghestdegree;
                    var profession = req.body.profession;
                    var file = req.file.filename;
                    var awards = req.body.awards;
                    var dist = req.body.dist;
            
            
            
                  
                 
                 
                    // insert to db
                    mysqlconnection.query("update student set fname=?,lname=?,phone=?,email=?,password=?,cnic=?,dob=?,sesstart=?,sesend=?,gender=?,enrolschool=?,leaveschool=?,permanentcity=?,cruntcity=?,hieghestdegree=?,profession=?,img=?,awards=?,distiniction=?", [fname,lname,phone,email,password,cnic,dob,sesstart,sesend,gender,enrolschool,leaveschool,permanentcity,cruntcity,hieghestdegree,profession,file,awards,dist,req.params.id], function (error, results, fields) {
                        if (error) throw error;
                        return res.send({ error: false, data: results, message: 'Successfuly Updated' });
                    });
               
               
                  });



                  app.post('/studentlogin',(req,res)=>{
        
                    var email = req.body.email;
                    var password = req.body.password;
                    
                 mysqlconnection.query("SELECT *FROM student WHERE email=? AND password=?", [email,password], function (error, results, fields) {
                    
                        if (results.length > 0) {
                       let uid=results[0].id;
                        let payload={subject:results[0].id}
                            let token=jwt.sign(payload,'secretkey')
                           // res.status(200).send({managertoken});
                           data={
                            token,
                             uid       
                          }
                       res.status(200).send(data);
                         
                        } else {
                            res.send('Incorrect Username and/or Password!');
                        }			
                      res.end();
                                                                  });
                 
                    
                    });




                    app.get('/student/:id',(req,res)=>{
        
            
           
         
                        mysqlconnection.query("SELECT *FROM student where id =? ",[req.params.id], function (error, results, fields) {
                            if (error) throw error;
                            return res.send(results);
                        });
                        
                        });





                        app.get('/student',(req,res)=>{
        
            
           
         
                            mysqlconnection.query("SELECT *FROM student", function (error, results, fields) {
                                if (error) throw error;
                                return res.send(results);
                            });
                            
                            });
                            app.get('/students',(req,res)=>{
        
            
           
         
                                mysqlconnection.query("SELECT *FROM student limit 3", function (error, results, fields) {
                                    if (error) throw error;
                                    return res.send(results);
                                });
                                
                                });
                            app.get('/teacher',(req,res)=>{
        
            
           
         
                                mysqlconnection.query("SELECT *FROM teachers", function (error, results, fields) {
                                    if (error) throw error;
                                    return res.send(results);
                                });
                                
                                });
                                app.get('/teachers',(req,res)=>{
        
            
           
         
                                    mysqlconnection.query("SELECT *FROM teachers limit 3", function (error, results, fields) {
                                        if (error) throw error;
                                        return res.send(results);
                                    });
                                    
                                    });


                                    app.get('/oneEvent',(req,res)=>{
        
            
           
         
                                        mysqlconnection.query("SELECT *FROM events limit 1", function (error, results, fields) {
                                            if (error) throw error;
                                            return res.send(results);
                                        });
                                        
                                        });


                                  