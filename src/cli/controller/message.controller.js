const push = require('web-push')
module.exports.send = async () => {
    const vapid = { 
        publicKey: 'BI_ejoGi-TB4Kh_S52zBik5bDotGG6CnixibCxDWeBpo-fwYJ_jTDzymsSgL0kcU7mLDXMbYUTGbRcCHSHM7GUU',
        privateKey: 'jC0V9QjEpzPZioEf8UqVp2pQn1nCmP8pYEUCZGwo1zY' 
    }

    push.setVapidDetails('mailto:paneedovanie@yahoo.com', vapid.publicKey, vapid.privateKey)
    let sub = {
        endpoint: "https://fcm.googleapis.com/fcm/send/cYDFuniYBqU:APA91bER7HhXqmN4mX4ikhBumkWO9zOGuTrYnl4CPs-kjww2YUEmpTMNCcXKbnx1jbvVM_F_BygrUqjxhYmdoyC5F14Lxm2h2sApQCEalW2wpNv_XHNe_h_liBm9wSez_OOR1kbL1CfC",
        expirationTime: null,
        keys: {
            p256dh: "BMgTKIRZpxHsi9ZXYK-N_gnDc3Oct3gZScDnbiClFQfaE6IxHXYfnenPHQ57-HM15GXxLMxa3jNGNHiVjqb8b1A", 
            auth: "y5mfckD2kRdRyzknmWpycQ"
        }
    }
    
    push.sendNotification(sub, 'Try my app now!')
}