const {externals}=MUGlobal.services.viewServer
let defaultExternals = {}
Object.assign(defaultExternals,externals || {})
module.exports=defaultExternals