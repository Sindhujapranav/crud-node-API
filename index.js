const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

let staff = [];
let student = [];

app.use(bodyParser.json());


app.post("/staffs", (req, res) => {
    console.log(" staff ID created successfully");
    staff.push(req.body);
    res.json({ staff });
});

app.get("/staffs", (req, res) => {
    console.log(" staff ID created");
    res.json(staff);
});

app.get("/students", (req, res) => {
    console.log("student ID created");
    res.json(student);
});


app.post("/students", (req, res) => {
    console.log("student ID created successfully");
    student.push(req.body);
    res.json(student);
});


app.get("/allStaff", (req, res) => {
    for (let i = 0; i < staff.length; i++) {
        let count = 0;
        for (let j = 0; j < student.length; j++) {
            if (staff[i].id === student[j].staff_id) {
                count += 1;
            }
        }
        staff[i].student_count = count;
    }
    let staffInfo = staff.map((data) => {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            student_count: data.student_count,
        };
    });
    res.json(staff);
});


app.delete("/studentsID/:id", (req, res) => {
    let filter = student.filter((val) => {
        if (val.id == req.params.id) {
            return val;
        }
    })[0];
    let index = student.indexOf(filter);
    student.splice(index, 1);
    res.json({ message: "student deleted" });
});



app.put("/students/:id", (req, res) => {
    studentDetails.forEach((elem) => {
        if (elem.id == req.params.id) {
            elem.name = req.body.name;
            res.status(200).send({
                message: "User Updated..!",
            });
        }
    });
    res.send("student log is edited");
});



app.listen(port, () => {
    console.log(`server is listening ${port}`);
});
