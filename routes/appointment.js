const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { slots, users, appointments, doctors } = new PrismaClient();
const fs = require("fs")

router.post('/appointment', async (req, res) => {

    const { user_id, doctor_id, date_time } = req.body;

    let slot = await slots.findFirst({
        where: {
            doctor_id,
            date_time
        }
    });
    console.log(slot)
    if (slot === null) {
        return res.status(404).json({
            msg: "slot not found"
        })
    }

    if (!(slot.appointment_id === null)) {
        return res.status(400).json({
            msg: "Appointment unavailable"
        })
    }

    let isUser = await users.findUnique({
        where: {
            id: user_id
        }
    })

    if (!isUser) {
        return res.status(400).json({
            msg: "User unavailable"
        })
    }

    let newAppointment = await appointments.create({
        data: {
            doctor_id,
            user_id,
            date_time
        }
    });

    const updateUser = await slots.update({
        where: {
            id: slot.id
        },
        data: {
            appointment_id: newAppointment.id
        },
    })

    res.json(newAppointment)


});


module.exports = router