let fs = require("fs");
const PathFile = "Data/Tasks.json";
function GetDataFromFileJSON(UserId) {
  const data = fs.readFileSync(PathFile, "utf8");
  let AllTasks = JSON.parse(data);
  let Tasks = AllTasks.filter((Tasks) => Tasks.UserId == UserId);
  if (Tasks.length == 0) {
    return [{ Message: "No tasks" }];
  } else {
    return Tasks[0];
  }
}
function CreateTask(UserId, Task) {
  const data = fs.readFileSync(PathFile, "utf8");
  let AllTasks = JSON.parse(data);
  const UserTasks = AllTasks.filter((Tasks) => Tasks.UserId == UserId);
  if (UserTasks.length == 0) {
    AllTasks.push({
      UserId: UserId,
      Tasks: [],
    });
    var id = "_" + Math.random().toString(16).slice(2);
    for (let i = 0; i < AllTasks.length; i++) {
      if (AllTasks[i].UserId == UserId) {
        AllTasks[i].Tasks.push({
          Title: Task,
          id: id,
          done: true,
          DateLastEdit: "",
        });
        fs.writeFileSync(PathFile, JSON.stringify(AllTasks));
        return AllTasks[i].Tasks;
      }
    }
  } else if (UserTasks.length != 0) {
    var id = "_" + Math.random().toString(16).slice(2);
    for (let i = 0; i < AllTasks.length; i++) {
      if (AllTasks[i].UserId == UserId) {
        AllTasks[i].Tasks.push({
          Title: Task,
          id: id,
          done: true,
          DateLastEdit: "",
        });
        fs.writeFileSync(PathFile, JSON.stringify(AllTasks));
        return AllTasks[i].Tasks;
      }
    }
  }
}
function ChangeTask(UserId, TaskId, done, DateEdit) {
  const data = fs.readFileSync(PathFile, "utf8");
  let Tasks = JSON.parse(data);
  for (let i = 0; i < Tasks.length; i++) {
    if (Tasks[i].UserId == UserId) {
      for (let y = 0; y < Tasks[i].Tasks.length; y++) {
        if (Tasks[i].Tasks[y].id == TaskId) {
          Tasks[i].Tasks[y].done = done;
          Tasks[i].Tasks[y].DateLastEdit = DateEdit;
          fs.writeFileSync(PathFile, JSON.stringify(Tasks));
          return Tasks[i].Tasks;
        }
      }
    }
  }
}
function deleteTask(UserId, TaskId) {
  const data = fs.readFileSync(PathFile, "utf8");
  let Tasks = JSON.parse(data);
  for (let i = 0; i < Tasks.length; i++) {
    if (Tasks[i].UserId == UserId) {
      for (let x = 0; x < Tasks[i].Tasks.length; x++) {
        if (Tasks[i].Tasks[x].id == TaskId) {
          Tasks[i].Tasks.splice(x, 1);
        }
      }
      fs.writeFileSync(PathFile, JSON.stringify(Tasks));
      return Tasks[i].Tasks;
    }
  }
}
function deleteAllTasks(UserId) {
  const data = fs.readFileSync(PathFile, "utf8");
  let Tasks = JSON.parse(data);
  for (let i = 0; i < Tasks.length; i++) {
    if (Tasks[i].UserId == UserId) {
      Tasks[i].Tasks = [];
      fs.writeFileSync(PathFile, JSON.stringify(Tasks));
      return Tasks;
    }
  }
}
module.exports.GetDataFromFileJSON = GetDataFromFileJSON;
module.exports.CreateTask = CreateTask;
module.exports.ChangeTask = ChangeTask;
module.exports.deleteTask = deleteTask;
module.exports.deleteAllTasks = deleteAllTasks;
