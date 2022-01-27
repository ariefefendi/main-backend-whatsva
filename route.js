const instanceController = require('./src/controller/InstanceController')
const messageController = require('./src/controller/MessageController')
const groupController = require('./src/controller/GroupController')
const middleware = require("./src/middleware/middleware")
const toolsController = require("./src/controller/ToolsController")
const webhookController = require("./src/controller/WebhookController")

module.exports = app => {
   
    app.post('/api/initInstance',[middleware.cek_panel_key],instanceController.initInstance)
    app.post('/api/instance',[middleware.cek_panel_key],instanceController.detail)
    app.post('/api/instanceReset',[middleware.cek_panel_key],instanceController.resetInstance)
    app.post('/api/instanceDelete',[middleware.cek_panel_key],instanceController.delete)
    app.post('/api/instances',[middleware.cek_panel_key],instanceController.list)
    app.post('/api/generateQr',[middleware.cek_panel_key], instanceController.generateQr)
    app.post('/api/update_multidevice',[middleware.cek_panel_key],instanceController.update_multidevice)
    

    app.post('/api/checkNumber',[middleware.cek_panel_key,middleware.formatnumber],toolsController.checkNumber)
    app.post('/api/listContact',[middleware.cek_panel_key],toolsController.ListContact)


    app.post('/api/sendMessageText',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendMessageText)
    app.post('/api/sendImageUrl',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendImageUrl)
    app.post('/api/sendDocumentUrl',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendDocumentUrl)
    app.post('/api/sendVideoUrl',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendVideoUrl)
    app.post('/api/sendLocation',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendLocation)
    app.post('/api/sendVCard',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendVCard)
    app.post('/api/sendListMessage',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendListMessages)
    app.post('/api/sendButtonMessage',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendButtonMessages)
    // app.post('/api/sendButtonUrlMessages',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendButtonUrlMessages)
    app.post('/api/sendTemplateMessages',[middleware.cek_panel_key,middleware.formatnumber],messageController.sendTemplateMessages)
  

  

    // routes Group 
    //  * group messages
    app.post('/api/sendMessageTextGroup',[middleware.cek_panel_key,],groupController.sendMessageText)
    app.post('/api/sendImageUrlGroup',[middleware.cek_panel_key],groupController.sendImageUrl)
    app.post('/api/sendDocumentUrlGroup',[middleware.cek_panel_key],groupController.sendDocumentUrl)
    app.post('/api/sendVideoUrlGroup',[middleware.cek_panel_key],groupController.sendVideoUrl)
    app.post('/api/sendLocationGroup',[middleware.cek_panel_key],groupController.sendLocation)
    app.post('/api/sendVCardGroup',[middleware.cek_panel_key],groupController.sendVCard)
    app.post('/api/sendListMessageGroup',[middleware.cek_panel_key],groupController.sendListMessages)
    app.post('/api/sendButtonMessageGroup',[middleware.cek_panel_key],groupController.sendButtonMessages)
    app.post('/api/sendTemplateMessagesGroup',[middleware.cek_panel_key],groupController.sendTemplateMessages)
    // * end group messages

    // * group event 
    app.post('/api/createGroup',[middleware.cek_panel_key],groupController.createGroup)
    app.post('/api/makeAdminGroup',[middleware.cek_panel_key],groupController.makeAdminGroup)
    app.post('/api/demoteAdminGroup',[middleware.cek_panel_key],groupController.demoteAdminGroup)
    app.post('/api/setGroupName',[middleware.cek_panel_key],groupController.setGroupName)
    app.post('/api/updateDescriptionGroup',[middleware.cek_panel_key],groupController.updateDescriptionGroup)
    app.post('/api/leaveGroup',[middleware.cek_panel_key],groupController.leaveGroup)
    app.post('/api/inviteCode',[middleware.cek_panel_key],groupController.inviteCode)
    app.post('/api/listGroup',[middleware.cek_panel_key],groupController.listGroup)
    app.post('/api/listParticipants',[middleware.cek_panel_key],groupController.listParticipants)
    app.post('/api/groupInfo',[middleware.cek_panel_key],groupController.groupInfo)
    
    app.post('/api/addParticipants',[middleware.cek_panel_key],groupController.addParticipants)
    app.post('/api/removeParticipants',[middleware.cek_panel_key],groupController.removeParticipants)
    // * end group event

   

    // webhook 
    app.post('/api/webhooks',[middleware.cek_panel_key],webhookController.list)
    app.post('/api/webhook/detail',[middleware.cek_panel_key],webhookController.detail)
    app.post('/api/webhook/delete',[middleware.cek_panel_key],webhookController.delete)
    app.post('/api/webhook/add',[middleware.cek_panel_key],webhookController.add)
    //end webhook

    // end routes Group


    app.get('/', (req, res) => {
        res.send('Welcome Wa Multidevice API')
    })
    

}