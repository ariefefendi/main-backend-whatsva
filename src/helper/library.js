


function formatRupiah(angka, prefix){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
  
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  function GetFilename(url) {
    if (url) {
        var m = url.toString().match(/.*\/(.+?)\./);
        var extension = url.substring(url.lastIndexOf('.') + 1);
      
        if (m && m.length > 1) {
            var name = m[1]+""
            nama = name.replace("%20","-")
            return  name + '.' + extension;
        }

    }
    return "";
}
function getmime(extension) {
  // jpeg = "image/jpeg",
  // png = "image/png",
  // mp4 = "video/mp4",
  // gif = "video/gif",
  // pdf = "application/pdf",
  // ogg = "audio/ogg; codecs=opus",
  // mp4Audio = "audio/mp4",
  // /** for stickers */
  // webp = "image/webp"

  var mime;
  switch (extension) {
      case '.png':
          mime = "image/jpeg";
          break;
      case '.jpeg':
          mime = "image/jpeg";
          break;
      case '.jpg':
          mime = "image/jpeg";
          break;
      case '.JPG':
          mime = "image/jpg";
          break;
      case '.mp4':
          mime = "video/mp4";
          break;
      case '.gif':
          mime = "video/gif";
          break;
      case '.PNG':
          mime = "image/png";
          break;
      case '.JPEG':
          mime = "image/jpeg";
          break;
      case '.MP4':
          mime = "video/mp4";
          break;
      case '.GIF':
          mime = "video/gif";
          break;

      case '.pdf':
          mime = "application/pdf";
          break;
      case '.docx':
          mime = "application/vnd.openxmlformats-officedocument.wordprocessing";
          break;
      case '.doc':
          mime = "application/msword";
          break;
      case '.ogg':
          mime = "audio/ogg; codecs=opus";
          break;
      case '.webp':
          mime = "image/webp";
          break;
      case '.pkpass':
          mime = "application/vnd.apple.pkpass";
          break;
      default:
  }

  return mime;
}
function formatnumberindo(number){
    var tujuan = number
    var lengttujuan = tujuan.length
    var cekformat = tujuan.substr(0, 1)
    if (cekformat == 0) {
        var awal = '62'
        var length = lengttujuan - 1
        var akhir = tujuan.substr(1,length)

        var to = awal+akhir

        if (!to.includes("@s.whatsapp.net")) {
            to = to+'@s.whatsapp.net'
        }

        tujuan = to
        return tujuan;
    }else if(cekformat == '+'){
        if (!tujuan.includes("@s.whatsapp.net")) {
            tujuan = tujuan+'@s.whatsapp.net'
        }
        tujuan = tujuan.replace("+","")
        tujuan= tujuan.replace("-","")
        tujuan = tujuan.replace("-","")
        tujuan= tujuan.replace("-","")
        return tujuan;
    }else if (!tujuan.includes("@s.whatsapp.net")) {
        tujuan = tujuan+'@s.whatsapp.net'
        return tujuan;
        // res.send(tujuan)
    }else{
        return number;
    }
  
}
function getkontrol(extension) {
    // text = "conversation",
    // extendedText = "extendedTextMessage",
    // contact = "contactMessage",
    // location = "locationMessage",
    // liveLocation = "liveLocationMessage",
    // image = "imageMessage",
    // video = "videoMessage",
    // sticker = "stickerMessage",
    // document = "documentMessage",
    // audio = "audioMessage",
    // product = "productMessage"
    var kontol_file = ""
    // console.log(extension)
    // if (extension === '.pdf' || extension === '.PDF' || extension === '.docx') {
    //     kontol_file = MessageType.document
    // } else if (extension === '.png' || extension === '.jpeg' || extension === '.PNG' || extension === '.JPEG' || extension === '.webp' || extension === '.jpg' || extension === '.JPG') {
    //     kontol_file = MessageType.image
    // } else if (extension === '.mp4') {
    //     kontol_file = MessageType.video
    // } else if (extension === '.mp3') {
    //     kontol_file = MessageType.audio
    // } else if (extension === '.gif' || extension === '.GIF' || extension === '.ogg') {
    //     kontol_file = MessageType.video
    // } else if (extension === '.pkpass') {
    //     kontol_file = MessageType.document
    // }
    // else {
    //     kontol_file = whatsva.MessageType.text
    // }
    return kontol_file;
}
 module.exports = {
     makeid,
     GetFilename,getmime,formatRupiah,formatnumberindo,getkontrol
 }