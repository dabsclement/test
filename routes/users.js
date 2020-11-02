const express = require ('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Staff = require ('../model/staff');
const validateRegisterInput = require ('../middlewares/signUp');
const validateLoginInput = require ('../middlewares/signIn');

const router = express.Router()

/**
 * @description POST api/users/register route
 * @access  public
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Staff.findOne({ email: req.body.email }).then(staff => {
    if (staff) {
      return res.status(400).json({ email: 'Email already exist' })
    }
    const newStaff = new Staff({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password

    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newStaff.password, salt, (err, hash) => {
        if (err) throw err
        newStaff.password = hash
        newStaff
          .save()
          .then(staff => res.status(200).json(staff))
          .catch(err => res.status(500).json({ err }))
      })
    })
  })
})

/**
 * @description POST api/users/login route
 * @access  public
 */
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const email = req.body.email
  const password = req.body.password
  Staff.findOne({ email })
    .then(staff => {
      if (!staff) {
        return res.status(404).json({ msg: 'Username or password is Incorrect' })
      }
      bcrypt.compare(password, staff.password).then(isMatch => {
        if (!isMatch) {
          return res
            .status(400)
            .json({ status: 'fail', msg: 'Username or password is Incorrect' })
        }
        const payload = {
          id: staff.id,
          staff: staff.name

        }
        jwt.sign(
          payload,
          process.env.secretkey,
          { expiresIn: 3600 },
          (err, token) => {
            res.status(200).json({
              status: 'success',
              token: 'Bearer ' + token
            })
          }
        )
      })
    })
    .catch(err => res.status(500).json({ err }))
})

router.get('/staffs', async (req, res) => {
  const staffs = await User.find({});

  try {
    res.send(staffs);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/staff/:id', async (req, res) => {
  try {
    await Staff.findByIdAndUpdate(req.params.id, req.body)
    await Staff.save()
    res.send(staff)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/staff/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id)

    if (!staff) res.status(404).send("No staff found")
    res.status(200).send("staff deleted successfully")
  } catch (err) {
    res.status(500).send(err)
  }
})
module.exports = router;
