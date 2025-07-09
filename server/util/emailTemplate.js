const TaskReminderTemplate = (task) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <p>Hi ${task.user.username},</p>
      <p>This is a friendly reminder that your task titled: <strong>${task.title}</strong> is due tomorrow.</p>
      <p>If you have any questions or need assistance, please do not hesitate to contact us.</p>
      <p>Best regards,</p>
      <p>Task Manager Team</p>
    </div>
  `;
};

module.exports = { TaskReminderTemplate };
