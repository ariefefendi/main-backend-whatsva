const { GetFilename, getmime } = require('./../helper/library')
const path = require('path')


exports.sendMessageText = (req, res) => {
    var instance_key = req.body.instance_key
    var message = req.body.message
    var jid = req.body.jid
    console.log(req.body);

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
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

                const result = await session[[instance_key]].onWhatsApp(jid);
                    if(multidevice_status[[instance_key]] == "1"){
                        var check = (result.length > 0)?true:false;
                    }else if(multidevice_status[[instance_key]] == "0"){
                        var check = result.exists
                    }
                    if (!check) {
                        res.json({
                            success: false,
                            message: "Number Not found"
                        })
                    } else {
                        console.log("kirim "+jid)
                        // var sending_message = await session[[instance_key]].sendMessage(jid, {text:message})
                        var sending_message =await sendMessageWTyping({ text:message },jid,instance_key)
                        res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
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
    var jid = req.body.jid
    var imageUrl = req.body.imageUrl
    var caption = req.body.caption

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
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
            
                const result = await session[[instance_key]].onWhatsApp(jid);
                    if(multidevice_status[[instance_key]] == "1"){
                        var check = (result.length > 0)?true:false;
                    }else if(multidevice_status[[instance_key]] == "0"){
                        var check = result.exists
                    }
                    if (!check) {
                        res.json({
                            success: false,
                            message: "Number Not found"
                        })
                    } else {
                        var url = imageUrl
                        
                        var sending_message =await sendMessageWTyping({ image:{url:url} ,caption:caption},jid,instance_key)
                        res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
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
    var jid = req.body.jid
    var documentUrl = req.body.documentUrl


    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
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
            
                    const result = await session[[instance_key]].onWhatsApp(jid);
                    if(multidevice_status[[instance_key]] == "1"){
                        var check = (result.length > 0)?true:false;
                    }else if(multidevice_status[[instance_key]] == "0"){
                        var check = result.exists
                    }
                    if (!check) {
                        res.json({
                            success: false,
                            message: "Number Not found"
                        })
                    } else {
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
                        var sending_message = await sendMessageWTyping({ document:{url:documentUrl},fileName:fileName},jid,instance_key)
                   
                        res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
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
    var jid = req.body.jid
    var videoUrl = req.body.videoUrl
    var caption = req.body.caption

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
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
     
                    const result = await session[[instance_key]].onWhatsApp(jid);
                    if(multidevice_status[[instance_key]] == "1"){
                        var check = (result.length > 0)?true:false;
                    }else if(multidevice_status[[instance_key]] == "0"){
                        var check = result.exists
                    }
                    if (!check) {
                        res.json({
                            success: false,
                            message: "Number Not found"
                        })
                    } else {
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
                        var sending_message = await sendMessageWTyping(options ,jid,instance_key)
                         res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
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
    var jid = req.body.jid
    var coordinates = req.body.coordinates


    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
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
           
                    const result = await session[[instance_key]].onWhatsApp(jid);
                    if(multidevice_status[[instance_key]] == "1"){
                        var check = (result.length > 0)?true:false;
                    }else if(multidevice_status[[instance_key]] == "0"){
                        var check = result.exists
                    }
                    if (!check) {
                        res.json({
                            success: false,
                            message: "Number Not found"
                        })
                    } else {
                        //   var sending_message = await session[[instance_key]].sendMessage(jid, {url}, MessageType.image,{caption:caption});
                        // var sending_message = await session[[instance_key]].sendMessage(jid, { degreesLatitude: coordinates.lat, degreesLongitude: coordinates.long }, MessageType.location);
                        var sending_message = await sendMessageWTyping({location:{ degreesLatitude: coordinates.lat, degreesLongitude: coordinates.long }} ,jid,instance_key)
                   
                        res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
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
    var jid = req.body.jid
    var fullname = req.body.fullname
    var organization = req.body.organization
    var phoneNumber = req.body.phoneNumber

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
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
         
                    const result = await session[[instance_key]].onWhatsApp(jid);
                    if(multidevice_status[[instance_key]] == "1"){
                        var check = (result.length > 0)?true:false;
                    }else if(multidevice_status[[instance_key]] == "0"){
                        var check = result.exists
                    }
                    if (!check) {
                        res.json({
                            success: false,
                            message: "Number Not found"
                        })
                    } else {
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
                            },jid,instance_key)
                          
                            res.json({
                                success: true,
                                message: "Sending Message",
                                data: sending_message
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
    var jid = req.body.jid
    var buttonText = req.body.buttonText
    var description = req.body.description
    var sections2 = req.body.sections


    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
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
         
                    const result = await session[[instance_key]].onWhatsApp(jid);
                    if(multidevice_status[[instance_key]] == "1"){
                        var check = (result.length > 0)?true:false;
                    }else if(multidevice_status[[instance_key]] == "0"){
                        var check = result.exists
                    }
                    if (!check) {
                        res.json({
                            success: false,
                            message: "Number Not found"
                        })
                    } else {

                        const rows = [
                            {title: 'Row 1', description: "Hello it's description 1", rowId:"rowid1"},
                            {title: 'Row 2', description: "Hello it's description 2", rowId:"rowid2"}
                           ]
                        
                        //   var listMessage = {
                        //     text: text,
                        //     title: title,
                        //     buttonText: buttonText,
                        //     footer: footer,
                        //     sections: rows
                        // }
                        //    const sections = [{title: "Section 1", rows: rows}]
                        
                      
                      
                        var sending_message = await sendMessageWTyping({
                            text: "test",
                            title: "List Title",
                            buttonText: "Test",
                            footer: "powered by scooby and gang",
                            sections: [{
                              title: "Options",
                              rows: [{title: "Option 1", rowId: "option1"}, {title: "Option 2", rowId: "option2", description: "This is a description"}]
                            }]},jid,instance_key)
                        // var sending_message = await myclient[[device]].sendMessage(jid, button, MessageType.listMessage);
                        //   var sending_message = await myclient[[device]].sendMessage(jid, {url}, MessageType.image,{caption:caption});
    
                        res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
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
    var jid = req.body.jid
    var contentText = req.body.contentText
    var footerText = req.body.footerText
    var buttons = req.body.buttons
    var imagebutton = req.body.imageUrl

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
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
             
                    const result = await session[[instance_key]].onWhatsApp(jid);
                    if(multidevice_status[[instance_key]] == "1"){
                        var check = (result.length > 0)?true:false;
                    }else if(multidevice_status[[instance_key]] == "0"){
                        var check = result.exists
                    }
                    if (!check) {
                        res.json({
                            success: false,
                            message: "Number Not found"
                        })
                    } else {
                     
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
                        var sending_message = await sendMessageWTyping(buttonMessage,jid,instance_key)


                        res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
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
    var jid = req.body.jid

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
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
        })
    } else if (!text) {
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
           
                    const result = await session[[instance_key]].onWhatsApp(jid);
                    if(multidevice_status[[instance_key]] == "1"){
                        var check = (result.length > 0)?true:false;
                    }else if(multidevice_status[[instance_key]] == "0"){
                        var check = result.exists
                    }
                    if (!check) {
                        res.json({
                            success: false,
                            message: "Number Not found"
                        })
                    } else {
                        if(imagebutton!= ""){
                            var content = {
                                text: text,
                                footer: footer,
                                templateButtons: templateButtons,
                                image:{url:imagebutton}
                            }
                        
                        }else{
                            var content = {
                                text: text,
                                footer: footer,
                                templateButtons: templateButtons
                            }
                        
                        }
                        var sending_message = await sendMessageWTyping(content,jid,instance_key)

                        
                        res.json({
                            success: true,
                            message: "Sending Message",
                            data: sending_message
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

