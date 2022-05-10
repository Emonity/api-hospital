const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { slots } = new PrismaClient();
const Prisma = new PrismaClient();

router.get('/date', async (req, res) => {
    // let schedules = await slots.findMany({
    //     select: {
    //         doctor: {
    //             select: {
    //                 name: true,
    //                 spec: true,
    //             }
    //         },
    //         date_time: true
    //     },
    //     where: {
    //         date_time: new Date(req.body.date_time)
    //     }
    // })
    let slot = await Prisma.$queryRaw`SELECT doctors.name, doctors.spec, slots.date_time FROM slots JOIN doctors ON doctors.id = slots.doctor_id WHERE CAST(date_time as DATE) = ${req.body.date_time};`
    console.log(req.body)

    res.json(slot)
})

module.exports = router

