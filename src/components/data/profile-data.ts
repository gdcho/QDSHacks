export const term = [
  {
    value: "1",
    label: "Term 1",
  },
  {
    value: "2",
    label: "Term 2",
  },
  {
    value: "3",
    label: "Term 3",
  },
  {
    value: "4",
    label: "Term 4",
  },
];

export interface TermData {
  options?: {
    [key: string]: string[];
  };
  all?: string[];
}

interface CoursesByTerm {
  [key: string]: string[] | TermData;
}

export const coursesByTerm: CoursesByTerm = {
  "1": [
    "COMM 1116",
    "COMP 1100",
    "COMP 1113",
    "COMP 1510",
    "COMP 1537",
    "COMP 1712",
    "COMP 1800",
  ],
  "2": [
    "COMM 2216",
    "COMP 2121",
    "COMP 2510",
    "COMP 2522",
    "COMP 2714",
    "COMP 2721",
  ],
  "3": {
    options: {
      ai: ["COMP 3981"],
      clientserver: ["COMP 3940"],
      cloud: ["COMP 3962"],
      webmobile: ["COMP 3975"],
      database: ["COMP 3920"],
      datacomm: ["COMP 3980"],
      digitalprocessing: ["COMP 3773", "COMP 3931"],
      informationsystems: ["COMP 3910"],
      predictiveanalytics: ["COMP 3948"],
      paradigms: ["COMP 3958"],
      entrepreneur: ["COMP 3942"],
      technical: ["COMP 3951"],
    },
    all: ["COMP 3522", "COMP 3717", "COMP 3721", "COMP 3760", "MATH 3042"],
  },
  "4": {
    options: {
      ai: ["COMP 4983", "COMP 4989"],
      clientserver: ["COMP 4941", "COMP 4945"],
      cloud: ["COMP 4964", "COMP 4968"],
      webmobile: ["COMP 4976", "COMP 4977"],
      database: ["COMP 4921", "COMP 4925"],
      datacomm: ["COMP 4981", "COMP 4985"],
      digitalprocessing: ["COMP 4932", "COMP 4995"],
      informationsystems: ["COMP 4870", "COMP 4911", "COMP 4915"],
      predictiveanalytics: ["COMP 4948", "COMP 4949"],
      paradigms: ["COMP 4958", "COMP 4959"],
      entrepreneur: ["COMP 4943", "COMP 4944", "COMP 4946", "MKTG 4919"],
      technical: ["COMP 4952", "COMP 4956"],
    },
    all: ["COMP 4537", "COMP 4736", "LIBS 7102"],
  },
};

export const optionsLabels: { [key: string]: string } = {
  ai: "Artificial Intelligence",
  clientserver: "Client/Server",
  cloud: "Cloud Computing",
  webmobile: "Web and Mobile",
  database: "Database",
  datacomm: "Data Communications",
  digitalprocessing: "Digital Processing",
  informationsystems: "Information Systems",
  predictiveanalytics: "Predictive Analytics",
  paradigms: "Programming Paradigms",
  entrepreneur: "Tech Entrepreneur",
  technical: "Technical Programming",
};
