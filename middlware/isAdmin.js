export const isAdmin = function (req,res,next){
    if(req.user.role!=="admin"){
        return res.status(403)({
            success:false,
            message:"Admin Only Access"
        })
    }
      next()
}