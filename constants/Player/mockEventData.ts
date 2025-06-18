const event1Img = require("../../assets/images/event1.png");

export const mockEventData = {
  "event-001": {
    id: "event-001",
    title: "State Powerlifting Challenge",
    organizer: "ABC Powerlifting",
    date: "Dec 5–7",
    location: "789 Pine Ln, Anytown, USA",
    registrationDeadline: "Nov 20",
    gender: "Male",
    image: event1Img,
    weightCategories: ["74kg", "83kg", "93kg"],
  },
  "event-002": {
    id: "event-002",
    title: "National Powerlifting Championship",
    organizer: "XYZ Federation",
    date: "Oct 26–28",
    location: "123 Main St, Anytown, USA",
    registrationDeadline: "Oct 10",
    gender: "Female",
    image: event1Img,
    weightCategories: ["66kg", "74kg"],
  },
  "event-003": {
    id: "event-003",
    title: "Regional Powerlifting Meet",
    organizer: "Local Gym",
    date: "Nov 15–17",
    location: "456 Oak Ave, Anytown, USA",
    registrationDeadline: "Nov 1",
    gender: "All",
    image: event1Img,
    weightCategories: ["59kg", "74kg"],
  },
};
