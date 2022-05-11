const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const { appointments, users, doctors } = new PrismaClient();
const fs = require("fs");
const { userInfo } = require("os");

const Time = async (req, res) => {
  const appointments =
    await Prisma.$queryRaw`SELECT doctors.name, doctors.spec, appointments.date_time, appointments.user_id FROM appointments JOIN doctors ON doctors.id = appointments.doctor_id WHERE CAST(date_time as DATE) = ${
      new Date("2022-05-12T19:00:00.000Z").toISOString().split("T")[0]
    };`;
    appointments.forEach(async (appointment) => {
            console.log()
    if (
        Math.floor((new Date(appointment.date_time) - new Date())/3.6e+6)+1 ==
      24 ||  Math.floor((new Date(appointment.date_time) - new Date())/3.6e+6)+1 ==
      2
    ) 
    {
      const user = await users.findUnique({
        where: {
          id: appointments[0].user_id,
        },
      });
      (() => {
        fs.appendFile(
          "hello.log",
          `Привет ${user.name}! Напоминаем, что вы записаны к ${appointment.name} - ${appointment.spec} завтра в ${appointment.date_time}`,
          (err) => {
            if (err) throw err;
          }
        );
      })();
    }
})
}
module.exports = {
  Time: Time,
};
