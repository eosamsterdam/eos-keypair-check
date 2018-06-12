let keyPair = null

function generate() {
    showPane('generate')

    setTimeout(() => {
        var privKey = byId('privKey').value;
        keyPair = regenerateEosKeyPair(privKey)

        hide("generate-progress")

        byId("generate-pubkey").innerHTML = keyPair.pubkey
        byId("generate-pubkey-error").innerHTML = keyPair.pubkeyError
        byId("generate-privkey").innerHTML = keyPair.privkey
        byId("generate-privkey-error").innerHTML = keyPair.privkeyError
        show("generate-confirm")
        show("generate-link")

        if(keyPair.pubkeyError || keyPair.privkeyError) {
            show("generate-compromised")
        }

    }, 1000)
}

function regenerateEosKeyPair(privKeyInput) {
  var {PrivateKey, PublicKey} = eos_ecc

    var privkeyError = ''
    var pubkeyError = ''

    try{
        var abc = PrivateKey.fromWif(privKeyInput);
        var privkey = abc.toWif()
        var pubkey = abc.toPublic().toString()
    } catch(error){
        privkeyError = 'Private key in invalid, please try again.'
    }

    if(privkey && pubkey){

        try {
          var pub2 = PrivateKey.fromWif(privkey).toPublic().toString()
          if(pubkey !== pub2) {
            throw {message: 'public key miss-match: ' + pubkey + ' !== ' + pub2}
          }
        } catch(error) {
          //console.log('privkeyError', error, privkey)
          privkeyError = error.message + ' => ' + privkey
        }



        try {
          PublicKey.fromStringOrThrow(pubkey)
        } catch(error) {
         // console.log('pubkeyError', error, pubkey)
          pubkeyError = error.message + ' => ' + pubkey
        }

    }


  if(privkeyError || pubkeyError) {
    privkey = 'DO NOT USE'
    pubkey = 'DO NOT USE'
  }

  return {pubkey, privkey, pubkeyError, privkeyError}
}

function showPane(name) {
    //hidePanes()
    show(`${name}-pane`)
    show(`${name}-progress`)
    hide(`${name}-confirm`)
    hide(`${name}-link`)
}
