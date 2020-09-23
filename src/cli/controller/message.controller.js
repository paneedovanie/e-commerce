const push = require('web-push')
module.exports.send = async () => {
    const vapid = { 
        publicKey: 'BI_ejoGi-TB4Kh_S52zBik5bDotGG6CnixibCxDWeBpo-fwYJ_jTDzymsSgL0kcU7mLDXMbYUTGbRcCHSHM7GUU',
        privateKey: 'jC0V9QjEpzPZioEf8UqVp2pQn1nCmP8pYEUCZGwo1zY' 
    }

    push.setVapidDetails('mailto:paneedovanie@yahoo.com', vapid.publicKey, vapid.privateKey)
    let sub = {
        endpoint: "https://fcm.googleapis.com/fcm/send/cIs1IlgScWw:AP…0qaiGjelSqeSrTW09GbGSmxgVfVDcO45wJQqO-HqrHyGRd1Yp", 
        expirationTime: null, 
        options: {
            userVisibleOnly: true,
            applicationServerKey: 'BI_ejoGi-TB4Kh_S52zBik5bDotGG6CnixibCxDWeBpo-fwYJ_jTDzymsSgL0kcU7mLDXMbYUTGbRcCHSHM7GUU'
        }}
    push.sendNotification(sub, 'Try my app now!')
}