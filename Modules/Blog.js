let fs = require("fs");
const PathFile = "Data/Blog.json";

function GetAllBlogs() {
  const data = fs.readFileSync(PathFile, "utf8");
  let AllBlog = JSON.parse(data);
  let AllBlogToShow = []
  for (var i = 0; i < AllBlog.length; i++) {
    for (var x = 0; x < AllBlog[i].Blogs.length; x++) {
       AllBlogToShow.push(AllBlog[i].Blogs[x])
    }
  }
  if(AllBlogToShow.length == 0){
      return [{Message:"No Blogs"}]
  }else{
      return AllBlogToShow;
  }  
}

function GetBlogsAll(UserId) {
  const data = fs.readFileSync(PathFile, "utf8");
  let AllBlog = JSON.parse(data);
  let Blogs = AllBlog.filter((Blogs) => Blogs.UserId == UserId);
  if (Blogs.length == 0 || Blogs[0].Blogs.length == 0) {
    return [{ Message: "No Blogs" }];
  } else {
    return Blogs[0].Blogs;
  }
}
function GetBlogById(BlogId) {
  const data = fs.readFileSync(PathFile, "utf8");
  let AllBlog = JSON.parse(data);
  let AllBlogToShow = []
  for (var i = 0; i < AllBlog.length; i++) {
    for (var x = 0; x < AllBlog[i].Blogs.length; x++) {
      if(AllBlog[i].Blogs[x].id == BlogId){
        return AllBlog[i].Blogs[x];
      }
    }
  }
 
}

function CreateBlog(Title, Body, UrlImage, UserId, Direction) {
  const data = fs.readFileSync(PathFile, "utf8");
  let AllBlog = JSON.parse(data);
  let Blogs = AllBlog.filter((Blogs) => Blogs.UserId == UserId);
  if (Blogs.length == 0) {
    var id = Math.random().toString(16).slice(2);
    let Blog = {
      id: id,
      Title,
      Title,
      Body: Body,
      UrlImage: UrlImage,
      Direction:Direction,
      date: new Date(),
    };
    AllBlog.push({
      UserId: UserId,
      Blogs: [Blog],
    });
    fs.writeFileSync(PathFile, JSON.stringify(AllBlog));
    let array = []
    array.push(Blog)
    return array;
  } else if (Blogs.length != 0) {
    for (let i = 0; i < AllBlog.length; i++) {
      if (AllBlog[i].UserId == UserId) {
        var id = Math.random().toString(16).slice(2);
        AllBlog[i].Blogs.push({
          id: id,
          Title,
          Title,
          Body: Body,
          UrlImage: UrlImage,
          Direction:Direction,
          date: new Date(),
        });
        fs.writeFileSync(PathFile, JSON.stringify(AllBlog));
        return AllBlog[i].Blogs;
      }
    }
  }
}

function deleteBlog(BlogId,UserId) {
  const data = fs.readFileSync(PathFile, "utf8");
  let AllBlog = JSON.parse(data);
  let Blogs = AllBlog.filter((Blogs) => Blogs.UserId == UserId);
  for (var i = 0; i < AllBlog.length; i++) {
    if(AllBlog[i].UserId == UserId){
      for (var x = 0; x < AllBlog[i].Blogs.length; x++) {
        if(AllBlog[i].Blogs[x].id == BlogId){
          AllBlog[i].Blogs.splice(x,1)
           fs.writeFileSync(PathFile, JSON.stringify(AllBlog));
        }
      }
    }
  }
  return Blogs[0].Blogs;
}
module.exports.GetBlogsAll = GetBlogsAll;
module.exports.CreateBlog = CreateBlog;
module.exports.GetAllBlogs = GetAllBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.GetBlogById = GetBlogById;
