const schedule = require("node-schedule");
const taskService = require("../tasks/task.service");
const moment = require("moment");
const { TaskReminderTemplate } = require("./emailTemplate");
const { sendEmail } = require("./sendEmail.util");

//cron job helper fun
const cronJob = (cronTime, callback) => {
  schedule.scheduleJob(cronTime, callback);
};

// */30 * * * * * => every 30 seconds
// 0 6 * * * => every day at 6 am

const sendTaskReminder = async () => {
  cronJob("0 6 * * *", async () => {
    console.log("Task reminder cron job running...");

    const today = moment().format("YYYY-MM-DD") + "T00:00:00.000Z";

    const tasks = await taskService.findTaskByDueDate(today);

    tasks.forEach(async (task) => {
      const email = task.user.email;
      const subject = "Task Reminder";
      const htmlBody = TaskReminderTemplate(task);

      await sendEmail(email, subject, htmlBody, null);
    });
  });
};

module.exports = { sendTaskReminder };
