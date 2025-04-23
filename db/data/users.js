import bcrypt from "bcryptjs"

const password = bcrypt.hashSync('pass', 12)

export default [
  {
    email: "alice@example.com",
    username: "alice123",
    password,
    profileImage: "https://i.pravatar.cc/150?img=1"
  },
  {
    email: "bob@example.com",
    username: "bobbyB",
    password,
    profileImage: "https://i.pravatar.cc/150?img=2"
  },
  {
    email: "charlie@example.com",
    username: "charlieX",
    password,
    profileImage: "https://i.pravatar.cc/150?img=3"
  },
  {
    email: "diana@example.com",
    username: "dianaQueen",
    password,
    profileImage: "https://i.pravatar.cc/150?img=4"
  },
  {
    email: "edward@example.com",
    username: "edwardTech",
    password,
    profileImage: "https://i.pravatar.cc/150?img=5"
  },
  {
    email: "fiona@example.com",
    username: "fiona_dev",
    password,
    profileImage: "https://i.pravatar.cc/150?img=6"
  },
  {
    email: "george@example.com",
    username: "geoKnight",
    password,
    profileImage: "https://i.pravatar.cc/150?img=7"
  },
  {
    email: "hannah@example.com",
    username: "hanSpark",
    password,
    profileImage: "https://i.pravatar.cc/150?img=8"
  },
  {
    email: "ian@example.com",
    username: "ianSky",
    password,
    profileImage: "https://i.pravatar.cc/150?img=9"
  },
  {
    email: "julia@example.com",
    username: "julesOnline",
    password,
    profileImage: "https://i.pravatar.cc/150?img=10"
  }
]
