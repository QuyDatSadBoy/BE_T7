module.exports.createPost = (req, res, next) => {
  if (req.body.title == "") {
    req.flash("error", "Vui lòng nhập Title !");
    res.redirect("back");
    return;
  }
  next();
}