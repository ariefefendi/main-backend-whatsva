
const { GetFilename, getmime, formatnumberindo } = require('./../helper/library')
const path = require('path')
// Group Messages

exports.sendMessageText = (req, res) => {
    var instance_key = req.body.instance_key
    var message = req.body.message
    var jid_group = req.body.jid_group

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid_group) {
        res.json({
            success: false,
            message: "jid_group empty"
        })
    } else if (!message) {
        res.json({
            success: false,
            message: "message empty"
        })
    } else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`

        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {


                if (!jid_group.includes("@g.us")) {
                    jid_group = jid_group + "@g.us"
                } else {
                    var cek = `select * from tb_group where jid_group ='${jid_group}' and instance_key='${instance_key}'`

                    conn.query(cek, async (err, results) => {
                        if (err) console.log(err)
                        if (results.length > 0) {

                        var sending_message =await sendMessageWTyping({ text:message },jid_group,instance_key)
                        res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
                        })
                        } else {
                            res.json({
                                success: false,
                                message: "Jid Group Not found"
                            })
                        }

                    })
                }


            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.sendImageUrl = (req, res) => {
    var instance_key = req.body.instance_key
    var jid_group = req.body.jid_group
    var imageUrl = req.body.imageUrl
    var caption = req.body.caption

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid_group) {
        res.json({
            success: false,
            message: "jid_group empty"
        })
    } else if (!imageUrl) {
        res.json({
            success: false,
            message: "imageUrl empty"
        })
    }
    else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                if (!jid_group.includes("@g.us")) {
                    jid_group = jid_group + "@g.us"
                } else {
                    var cek = `select * from tb_group where jid_group ='${jid_group}' and instance_key='${instance_key}'`

                    conn.query(cek, async (err, results) => {
                        if (err) console.log(err)
                        if (results.length > 0) {

                            var url = imageUrl
                            var sending_message =await sendMessageWTyping({ image:{url:url} ,caption:caption},jid_group,instance_key)
                        res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
                        })

                        } else {
                            res.json({
                                success: false,
                                message: "Group Not found"
                            })


                        }
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.sendDocumentUrl = (req, res) => {
    var instance_key = req.body.instance_key
    var jid_group = req.body.jid_group
    var documentUrl = req.body.documentUrl


    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid_group) {
        res.json({
            success: false,
            message: "jid_group empty"
        })
    } else if (!documentUrl) {
        res.json({
            success: false,
            message: "documentUrl empty"
        })
    }
    else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                if (!jid_group.includes("@g.us")) {
                    jid_group = jid_group + "@g.us"
                } else {
                    var cek = `select * from tb_group where jid_group ='${jid_group}' and instance_key='${instance_key}'`

                    conn.query(cek, async (err, results) => {
                        if (err) console.log(err)
                        if (results.length > 0) {
                            var url = documentUrl
                            var fileName = GetFilename(url)
                            var extension = path.extname(fileName)
                            var mime = getmime(extension)
                            var options = ""
                            options = {
                                filename: fileName,
                                mimetype: mime,
                                caption: ''
                            } // some metadata & caption
                            var sending_message = await sendMessageWTyping({ document:{url:documentUrl},fileName:fileName},jid_group,instance_key)
                       
                            res.json({
                                success: true,
                                message: "Sending Message",
                                data: sending_message
                            })
                        } else {
                            res.json({
                                success: false,
                                message: "Group Not found"
                            })
                        }
                    })

                }
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.sendVideoUrl = (req, res) => {
    var instance_key = req.body.instance_key
    var jid_group = req.body.jid_group
    var videoUrl = req.body.videoUrl
    var caption = req.body.caption

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid_group) {
        res.json({
            success: false,
            message: "jid_group empty"
        })
    } else if (!videoUrl) {
        res.json({
            success: false,
            message: "videoUrl empty"
        })
    }
    else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                if (!jid_group.includes("@g.us")) {
                    jid_group = jid_group + "@g.us"
                } else {
                    var cek = `select * from tb_group where jid_group ='${jid_group}' and instance_key='${instance_key}'`

                    conn.query(cek, async (err, results) => {
                        if (err) console.log(err)
                        if (results.length > 0) {
                            var url = videoUrl
                        
                            var fileName = GetFilename(url)
                            var extension = path.extname(fileName)
                            var mime = getmime(extension)
                            var options = ""
                            options = {
                                video:{url:videoUrl},
                                filename: fileName,
                                mimetype: mime,
                                caption: caption
                            } // some metadata & caption
                            //   var sending_message = await session[[instance_key]].sendMessage(jid, {url}, MessageType.image,{caption:caption});
                            var sending_message = await sendMessageWTyping(options ,jid_group,instance_key)
                             res.json({
                                success: true,
                                message: "Sending Message",
                                data: sending_message
                            })

                           

                        } else {
                            res.json({
                                success: false,
                                message: "Group Not found"
                            })
                        }
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.sendLocation = (req, res) => {
    var instance_key = req.body.instance_key
    var jid_group = req.body.jid_group
    var coordinates = req.body.coordinates


    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid_group) {
        res.json({
            success: false,
            message: "jid_group empty"
        })
    }
    else if (!coordinates.lat) {
        res.json({
            success: false,
            message: "degreesLatitude empty"
        })
    }
    else if (!coordinates.long) {
        res.json({
            success: false,
            message: "degreesLongitude empty"
        })
    }
    else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                if (!jid_group.includes("@g.us")) {
                    jid_group = jid_group + "@g.us"
                } else {
                    var cek = `select * from tb_group where jid_group ='${jid_group}' and instance_key='${instance_key}'`

                    conn.query(cek, async (err, results) => {
                        if (err) console.log(err)
                        if (results.length > 0) {
                            var sending_message = await sendMessageWTyping({location:{ degreesLatitude: coordinates.lat, degreesLongitude: coordinates.long }} ,jid_group,instance_key)
                   
                            res.json({
                                success: true,
                                message: "Sending Message",
                                data: sending_message
                            })


                        }else{
                            res.json({
                                success: false,
                                message: "Group Not found"
                            })
                        }
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.sendVCard = (req, res) => {
    var instance_key = req.body.instance_key
    var jid_group = req.body.jid_group
    var fullname = req.body.fullname
    var organization = req.body.organization
    var phoneNumber = req.body.phoneNumber

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid_group) {
        res.json({
            success: false,
            message: "jid_group empty"
        })
    } else if (!fullname) {
        res.json({
            success: false,
            message: "fullname empty"
        })
    }
    else if (!organization) {
        res.json({
            success: false,
            message: "organization empty"
        })
    }
    else if (!phoneNumber) {
        res.json({
            success: false,
            message: "phoneNumber empty"
        })
    }
    else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                if (!jid_group.includes("@g.us")) {
                    jid_group = jid_group + "@g.us"
                } else {
                    var cek = `select * from tb_group where jid_group ='${jid_group}' and instance_key='${instance_key}'`

                    conn.query(cek, async (err, results) => {
                        if (err) console.log(err)
                        if (results.length > 0) {
                            const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
                            + 'VERSION:3.0\n'
                            + 'FN:' + fullname + '\n' // full name
                            + 'ORG:' + organization + ';\n' // the organization of the contact
                            + 'TEL;type=CELL;type=VOICE;waid=' + phoneNumber + ':+' + phoneNumber + '\n' // WhatsApp ID + phone number
                            + 'END:VCARD'
                            var sending_message = await sendMessageWTyping({ 
                                contacts: { 
                                    displayName: fullname, 
                                    contacts: [{ vcard }] 
                                }
                            },jid_group,instance_key)
                          
                            res.json({
                                success: true,
                                message: "Sending Message",
                                data: sending_message
                            })

                        } else {
                            res.json({
                                success: false,
                                message: "Group Not found"
                            })
                        }
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.sendListMessages = (req, res) => {
    var instance_key = req.body.instance_key
    var jid_group = req.body.jid_group
    var buttonText = req.body.buttonText
    var description = req.body.description
    var sections2 = req.body.sections


    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid_group) {
        res.json({
            success: false,
            message: "jid_group empty"
        })
    } else if (!buttonText) {
        res.json({
            success: false,
            message: "buttonText empty"
        })
    }
    else if (!description) {
        res.json({
            success: false,
            message: "description empty"
        })
    }
    else if (!sections2) {
        res.json({
            success: false,
            message: "sections empty"
        })
    }
    else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                if (!jid_group.includes("@g.us")) {
                    jid_group = jid_group + "@g.us"
                } else {
                    var cek = `select * from tb_group where jid_group ='${jid_group}' and instance_key='${instance_key}'`

                    conn.query(cek, async (err, results) => {
                        if (err) console.log(err)
                        if (results.length > 0) {
                            const button = {
                                buttonText: buttonText,
                                description: description,
                                sections: sections2,
                                listType: 1
                            }

                            // var sending_message = await session[[instance_key]].sendMessage(jid_group, button, MessageType.listMessage);
                            // //   var sending_message = await session[[instance_key]].sendMessage(jid_group, {url}, MessageType.image,{caption:caption});

                            // res.json({
                            //     success: true,
                            //     message: "Sending Message",
                            //     data: sending_message
                            // })

                        } else {
                            res.json({
                                success: false,
                                message: "Group Not found"
                            })
                        }
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.sendButtonMessages = (req, res) => {
    var instance_key = req.body.instance_key
    var jid_group = req.body.jid_group
    var contentText = req.body.contentText
    var footerText = req.body.footerText
    var buttons = req.body.buttons
    var imagebutton = req.body.imageUrl

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid_group) {
        res.json({
            success: false,
            message: "jid_group empty"
        })
    } else if (!contentText) {
        res.json({
            success: false,
            message: "contentText empty"
        })
    }
    else if (!footerText) {
        res.json({
            success: false,
            message: "footerText empty"
        })
    }
    else if (!buttons) {
        res.json({
            success: false,
            message: "buttons empty"
        })
    }
    else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                if (!jid_group.includes("@g.us")) {
                    jid_group = jid_group + "@g.us"
                } else {
                    var cek = `select * from tb_group where jid_group ='${jid_group}' and instance_key='${instance_key}'`

                    conn.query(cek, async (err, results) => {
                        if (err) console.log(err)
                        if (results.length > 0) {
                            var buttonMessage = {}
                            if(imagebutton!= ""){
                                buttonMessage = {
                                    image: {url: imagebutton},
                                    caption:  contentText + "",
                                    footerText: footerText + "",
                                    buttons: buttons,
                                    headerType: 4
                                }
                            
                            }else{
                                buttonMessage = {
                                    caption:  contentText + "",
                                    footerText: footerText + "",
                                    buttons: buttons,
                                    headerType: 4
                                }
                            
                            }
                            var sending_message = await sendMessageWTyping(buttonMessage,jid_group,instance_key)
    
    
                            res.json({
                                success: true,
                                message: "Sending Message",
                                data: sending_message
                            })

                        } else {
                            res.json({
                                success: false,
                                message: "Group Not found"
                            })
                        }
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.sendTemplateMessages = (req, res) => {
    var instance_key = req.body.instance_key
    var jid_group = req.body.jid_group

    var text = req.body.text
    var footer = req.body.footer
    var templateButtons = req.body.templateButtons
    
  // const templateButtons = [
    //     {index: 1, urlButton: {displayText: '⭐ Star Baileys on GitHub!', url: 'https://github.com/adiwajshing/Baileys'}},
    //     {index: 2, callButton: {displayText: 'Call me!', phoneNumber: '+1 (234) 5678-901'}},
    //     {index: 3, quickReplyButton: {displayText: 'This is a reply, just like normal buttons!', id: 'id-like-buttons-message'}},
    //   ]
    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid_group) {
        res.json({
            success: false,
            message: "jid_group empty"
        })
    }else if (!text) {
        res.json({
            success: false,
            message: "text empty"
        })
    }
    else if (!footer) {
        res.json({
            success: false,
            message: "footer empty"
        })
    } else if (!templateButtons) {
        res.json({
            success: false,
            message: "templateButtons empty"
        })
    }
    else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                if (!jid_group.includes("@g.us")) {
                    jid_group = jid_group + "@g.us"
                } else {
                    var cek = `select * from tb_group where jid_group ='${jid_group}' and instance_key='${instance_key}'`

                    conn.query(cek, async (err, results) => {
                        if (err) console.log(err)
                        if (results.length > 0) {
                            var content = {
                                text: text,
                                footer: footer,
                                templateButtons: templateButtons
                            }
        
                            var sending_message = await sendMessageWTyping(content,jid_group,instance_key)
    
                            
                            res.json({
                                success: true,
                                message: "Sending Message",
                                data: sending_message
                            })

                        } else {
                            res.json({
                                success: false,
                                message: "Group Not found"
                            })
                        }
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}

// end group Messages

// group Event

exports.createGroup = (req, res) => {
    var instance_key = req.body.instance_key;
    var groupName = req.body.groupName;
    var participants = req.body.participants;
    var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sqlcek, async (err, results) => {
        if (results.length > 0) {
            console.log(groupName);
            var data_participant = [];
            for (i in participants){
                
                data_participant.push(formatnumberindo(participants[i]))
            }
            console.log(data_participant);
            // ("My Fab Group", ["1234@s.whatsapp.net", "4564@s.whatsapp.net"])
           
            var creategroup =await session[[instance_key]].groupCreate(groupName, data_participant)
          
            // var creategroup = session[[instance_key]].groupCreate("group test", [ "62895361034833@s.whatsapp.net","62851563459122@s.whatsapp.net" ]) // title & participants
            console.log ({dataGroup:creategroup})
            
            // var data_device = results.shift()
            // var infogroup = creategroup.content[0]
            
            var savegroup = `insert into tb_group set 
                    instance_key = '${instance_key}',
                    jid_phone = '${creategroup.owner}',
                    name='${creategroup.subject}',
                    jid_group='${creategroup.id}',
                    creation='null',
                    creator='${creategroup.owner}',
                    description='null',
                    descriptionId='null'`
        
            conn.query(savegroup)
            res.json({ success: true, message: `group created`, data: creategroup })
        } else {
            res.json({ success: false, message: `instance not found` })
        }
    })


    
    // res.json({ success: true, message: `group created`, data: creategroup})
}


exports.makeAdminGroup = (req, res) => {
    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;
    var participants = req.body.participants;

    let sql = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if (err) console.log(err)
        if (results.length > 0) {
            var data_participant = [];
            for (i in participants){
                
                data_participant.push(formatnumberindo(participants[i]))
            }
            var makeAdmin = await session[[instance_key]].groupParticipantsUpdate(jid_group,  data_participant,"promote") // jid group & participants

            res.json({ success: true, message: `Make Admin Group Success`, data: makeAdmin })

        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}
exports.demoteAdminGroup = (req, res) => {
    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;
    var participants = req.body.participants;

    let sql = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if (err) console.log(err)
        if (results.length > 0) {
            var data_participant = [];
            for (i in participants){
                
                data_participant.push(formatnumberindo(participants[i]))
            }
            var demoteAdmin = await session[[instance_key]].groupParticipantsUpdate(jid_group,  data_participant,"demote") // jid group & participants

            res.json({ success: true, message: `Demote Admin Group Success`, data: demoteAdmin })
        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}
exports.setGroupName = (req, res) => {
    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;
    var subject = req.body.groupName;

    let sql = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if (err) console.log(err)
        if (results.length > 0) {

            await session[[instance_key]].groupUpdateSubject(jid_group, subject) // jid group & subject
             // console.log(JSON.stringify(creategroup[2]))
            res.json({ success: true, message: `Update Name Group Success`, data: req.body })

        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}
exports.updateDescriptionGroup = (req, res) => {
    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;
    var description = req.body.description;

    let sql = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if (err) console.log(err)
        if (results.length > 0) {

            var updateDescription = await session[[instance_key]].groupUpdateDescription(jid_group, description) // jid group & description

            res.json({ success: true, message: `Update Description Group Success`, data: req.body })
        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}
exports.leaveGroup = (req, res) => {
    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;

    let sql = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if (err) console.log(err)
        if (results.length > 0) {

            var leaveGroup = await session[[instance_key]].groupLeave(jid_group) // jid_group
            conn.query(`delete from tb_group where jid_group='${jid_group}' and instance_key='${instance_key}'`)
            res.json({ success: true, message: `Leave Group Success`, data: leaveGroup })

        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}
exports.inviteCode = (req, res) => {
    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;

    let sql = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if (err) console.log(err)
        if (results.length > 0) {
            const code = await session[[instance_key]].groupInviteCode(jid_group) // jid_group
            console.log("group code: " + code)

            res.json({ success: true, message: `Get Invite Code Group Success`, data: { invite_code: "https://chat.whatsapp.com/" + code } })

        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}
exports.listGroup = (req, res) => {
    var instance_key = req.body.instance_key;
    conn.query(`select * from instance where instance_key ='${instance_key}'`, async (err, resultse) => {
        if (err) console.log(err)
        if (resultse.length > 0) {
            let sql = `select * from tb_group where instance_key ='${instance_key}'`;
            console.log(sql)
            conn.query(sql, async (err, results) => {
                if (results.length > 0) {
                    res.json({ success: true, message: `list group`, count: results.length, data: results })
                    // res.json({ success: true, message: `group created`, data: creategroup})
                } else {
                    res.json({ success: false, message: `Group not found` })
                }
            })
        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })


}

exports.listParticipants = (req, res) => {
    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;
    let sql = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if (results.length > 0) {

            let sql = `select * from tb_group where instance_key ='${instance_key}' `;

            conn.query(sql, async (err, results) => {
                if (err) console.log(err)
                if (results.length > 0) {
                    var data = await session[[instance_key]].groupMetadata(jid_group) // id & people to add to the group
                    // console.log(data.participants)
                    res.json({ success: true, message: `show member group`, datad: data.participants})
                } else {
                    res.json({ success: false, message: `Group not found` })
                }
            })

        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}
exports.groupInfo = (req, res) => {
    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;
    let sql = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if (results.length > 0) {
          
            let sql = `select * from tb_group where instance_key ='${instance_key}'`;

            conn.query(sql, async (err, results) => {
                if (err) console.log(err)
                if (results.length > 0) {
                    var data = await session[[instance_key]].groupMetadata(jid_group) // id & people to add to the group
                    // console.log(data.participants)
                    res.json({ success: true, message: `show group info`, datad: data })
                } else {
                    res.json({ success: false, message: `Group not found` })
                }
            })

        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}

exports.addParticipants = (req, res) => {
    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;
    var participants = req.body.participants;
    let sql = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if (results.length > 0) {
            var data_participant = [];
            for (i in participants){
                
                data_participant.push(formatnumberindo(participants[i]))
            }
            var data = await session[[instance_key]].groupParticipantsUpdate(jid_group, data_participant,"add")

            res.json({ success: true, message: `added successfully`, data: req.body })
        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}
exports.removeParticipants = (req, res) => {

    var instance_key = req.body.instance_key;
    var jid_group = req.body.jid_group;
    var participants = req.body.participants;
    let sql =`select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`
    conn.query(sql, async (err, results) => {
        if(err)console.log(err)
        if (results.length > 0) {
            var data_participant = [];
            for (i in participants){
                
                data_participant.push(formatnumberindo(participants[i]))
            }

            var data = await session[[instance_key]].groupParticipantsUpdate(jid_group, data_participant,"remove")

            res.json({ success: true, message: `remove member successfully`, data: req.body })
        } else {
            res.json({ success: false, message: `Instance not found` })
        }
    })
}
// end group event
