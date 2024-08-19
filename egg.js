/*
 Navicat Premium Data Transfer

 Source Server         : mongo
 Source Server Type    : MongoDB
 Source Server Version : 80000 (8.0.0-rc16)
 Source Host           : 127.0.0.1:27017
 Source Schema         : egg

 Target Server Type    : MongoDB
 Target Server Version : 80000 (8.0.0-rc16)
 File Encoding         : 65001

 Date: 16/08/2024 18:03:19
*/


// ----------------------------
// Collection structure for activity
// ----------------------------
db.getCollection("activity").drop();
db.createCollection("activity");

// ----------------------------
// Documents of activity
// ----------------------------
db.getCollection("activity").insert([ {
    _id: ObjectId("66bcb6dc48df632131ec5e38"),
    userId: "66bbfe9a44003bead33c7993",
    name: "yoke0001email21222",
    date: "2024-01-11",
    address: "北京",
    leaderId: ObjectId("66bc50ea7f85e7388a5b3e35"),
    participantIds: "66bc63447a43da73c7eae812,66bc63307a43da73c7eae80e,66bc636c7a43da73c7eae816",
    createdAt: ISODate("2024-08-14T13:53:32.32Z"),
    updatedAt: ISODate("2024-08-14T13:53:32.32Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("activity").insert([ {
    _id: ObjectId("66bdcd091bc7f3140d16ef94"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "yoke0001email21222",
    date: "2024-01-11",
    address: "北京",
    leaderId: ObjectId("66bc50ea7f85e7388a5b3e35"),
    participantIds: "66bc63447a43da73c7eae812,66bc63307a43da73c7eae80e,66bc636c7a43da73c7eae816",
    createdAt: ISODate("2024-08-15T09:40:25.969Z"),
    updatedAt: ISODate("2024-08-15T09:40:25.969Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("activity").insert([ {
    _id: ObjectId("66bdcd131bc7f3140d16ef98"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "yoke0001email21222",
    date: "2024-01-11",
    address: "北京",
    leaderId: ObjectId("66bc50ea7f85e7388a5b3e35"),
    participantIds: "66bc63447a43da73c7eae812,66bc63307a43da73c7eae80e,66bc636c7a43da73c7eae816",
    createdAt: ISODate("2024-08-15T09:40:35.149Z"),
    updatedAt: ISODate("2024-08-15T09:40:35.149Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("activity").insert([ {
    _id: ObjectId("66bdd4f01bc7f3140d16efd0"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "event 1111112222",
    date: "2024-08-16",
    address: "1111",
    description: "2222111",
    leaderId: ObjectId("66bdba1e1bc7f3140d16ef36"),
    participantIds: "66bdcb941bc7f3140d16ef7a,66bdd6701bc7f3140d16f009,66bdd67a1bc7f3140d16f00c",
    createdAt: ISODate("2024-08-15T10:14:08.772Z"),
    updatedAt: ISODate("2024-08-15T10:21:01.984Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("activity").insert([ {
    _id: ObjectId("66bdd8671bc7f3140d16f042"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "23232323",
    date: "2024-08-17",
    address: "1212",
    description: "1212",
    leaderId: ObjectId("66bdba1e1bc7f3140d16ef36"),
    participantIds: "66bdd6701bc7f3140d16f009,66bdd67a1bc7f3140d16f00c",
    createdAt: ISODate("2024-08-15T10:28:55.323Z"),
    updatedAt: ISODate("2024-08-16T08:19:55.284Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("activity").insert([ {
    _id: ObjectId("66be158a1bc7f3140d16f1b1"),
    userId: "66be145c1bc7f3140d16f147",
    name: "临期的活动",
    date: "2024-08-17",
    address: "1111",
    description: "22222",
    leaderId: ObjectId("66be149c1bc7f3140d16f15f"),
    participantIds: "66be14e71bc7f3140d16f175,66be14ce1bc7f3140d16f16f",
    createdAt: ISODate("2024-08-15T14:49:46.57Z"),
    updatedAt: ISODate("2024-08-16T06:12:13.129Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("activity").insert([ {
    _id: ObjectId("66beb1a94cba999c2f61f9ba"),
    userId: "66be145c1bc7f3140d16f147",
    name: "111",
    date: "2024-08-23",
    address: "111",
    description: "11",
    leaderId: ObjectId("66be149c1bc7f3140d16f15f"),
    participantIds: "66be14ce1bc7f3140d16f16f",
    createdAt: ISODate("2024-08-16T01:55:53.259Z"),
    updatedAt: ISODate("2024-08-16T01:55:53.259Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for leader
// ----------------------------
db.getCollection("leader").drop();
db.createCollection("leader");

// ----------------------------
// Documents of leader
// ----------------------------
db.getCollection("leader").insert([ {
    _id: ObjectId("66bcc0f7fd2fd9f38a536316"),
    userId: "66bbfe9a44003bead33c7993",
    name: "yoke0001email21111111",
    email: "111@qq.com",
    phone: "16666666",
    createdAt: ISODate("2024-08-14T14:36:39.146Z"),
    updatedAt: ISODate("2024-08-14T14:36:39.146Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leader").insert([ {
    _id: ObjectId("66bdba1e1bc7f3140d16ef36"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "yoke0001email21111111",
    email: "111@qq.com",
    phone: "16666666",
    createdAt: ISODate("2024-08-15T08:19:42.707Z"),
    updatedAt: ISODate("2024-08-15T08:19:42.707Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leader").insert([ {
    _id: ObjectId("66bdc6701bc7f3140d16ef53"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "yo ke",
    email: "111@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T09:12:16.535Z"),
    updatedAt: ISODate("2024-08-15T09:12:16.535Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leader").insert([ {
    _id: ObjectId("66bdca3c1bc7f3140d16ef70"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "yo-ke111",
    email: "2222@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T09:28:28.862Z"),
    updatedAt: ISODate("2024-08-15T09:28:28.862Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leader").insert([ {
    _id: ObjectId("66be137f1bc7f3140d16f140"),
    userId: "66be13441bc7f3140d16f123",
    name: "yoke",
    email: "2@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T14:41:03.241Z"),
    updatedAt: ISODate("2024-08-15T14:41:03.241Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leader").insert([ {
    _id: ObjectId("66be149c1bc7f3140d16f15f"),
    userId: "66be145c1bc7f3140d16f147",
    name: "yoke",
    email: "2@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T14:45:48.393Z"),
    updatedAt: ISODate("2024-08-15T14:45:48.393Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leader").insert([ {
    _id: ObjectId("66be14b41bc7f3140d16f165"),
    userId: "66be145c1bc7f3140d16f147",
    name: "yoke4",
    email: "4@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T14:46:12.187Z"),
    updatedAt: ISODate("2024-08-15T14:46:18.062Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for participant
// ----------------------------
db.getCollection("participant").drop();
db.createCollection("participant");

// ----------------------------
// Documents of participant
// ----------------------------
db.getCollection("participant").insert([ {
    _id: ObjectId("66bdcb941bc7f3140d16ef7a"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "y-111ke11",
    email: "1111@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T09:34:12.662Z"),
    updatedAt: ISODate("2024-08-15T09:34:28.77Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("participant").insert([ {
    _id: ObjectId("66bdd6701bc7f3140d16f009"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "1212",
    email: "1212@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T10:20:32.777Z"),
    updatedAt: ISODate("2024-08-15T10:20:32.777Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("participant").insert([ {
    _id: ObjectId("66bdd67a1bc7f3140d16f00c"),
    userId: "66bd9f3e5714f389f63fbe66",
    name: "232434234",
    email: "2333@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T10:20:42.637Z"),
    updatedAt: ISODate("2024-08-15T10:20:42.637Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("participant").insert([ {
    _id: ObjectId("66be14ce1bc7f3140d16f16f"),
    userId: "66be145c1bc7f3140d16f147",
    name: "yoke111",
    email: "11@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T14:46:38.434Z"),
    updatedAt: ISODate("2024-08-15T14:46:38.434Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("participant").insert([ {
    _id: ObjectId("66be14e71bc7f3140d16f175"),
    userId: "66be145c1bc7f3140d16f147",
    name: "yoke444",
    email: "44@qq.com",
    phone: "17633465272",
    createdAt: ISODate("2024-08-15T14:47:03.965Z"),
    updatedAt: ISODate("2024-08-15T14:47:11.124Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for task
// ----------------------------
db.getCollection("task").drop();
db.createCollection("task");

// ----------------------------
// Documents of task
// ----------------------------
db.getCollection("task").insert([ {
    _id: ObjectId("66be07d01bc7f3140d16f073"),
    userId: "66bd9f3e5714f389f63fbe66",
    activityId: ObjectId("66bcb6dc48df632131ec5e38"),
    title: "准备会议演示文稿6",
    deadline: "2024-08-22",
    assigneeId: ObjectId("66bc50ea7f85e7388a5b3e35"),
    status: "1",
    createdAt: ISODate("2024-08-15T13:51:12.889Z"),
    updatedAt: ISODate("2024-08-16T08:16:50.49Z"),
    __v: NumberInt("0"),
    description: "1111"
} ]);
db.getCollection("task").insert([ {
    _id: ObjectId("66be08ac1bc7f3140d16f076"),
    userId: "66bd9f3e5714f389f63fbe66",
    activityId: ObjectId("66bc67dad761e1ff3366d4d9"),
    title: "准备会议演示文稿6111",
    description: "描述描述描述",
    deadline: "2024-08-22",
    assigneeId: ObjectId("66bc50ea7f85e7388a5b3e35"),
    status: "1",
    createdAt: ISODate("2024-08-15T13:54:52.323Z"),
    updatedAt: ISODate("2024-08-15T14:12:49.373Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("task").insert([ {
    _id: ObjectId("66be156c1bc7f3140d16f1a9"),
    userId: "66be145c1bc7f3140d16f147",
    activityId: ObjectId("66beb1a94cba999c2f61f9ba"),
    title: "任务标题2222",
    description: "1111",
    deadline: "2024-08-23",
    assigneeId: ObjectId("66be149c1bc7f3140d16f15f"),
    status: "0",
    createdAt: ISODate("2024-08-15T14:49:16.651Z"),
    updatedAt: ISODate("2024-08-16T06:10:31.606Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("task").insert([ {
    _id: ObjectId("66be15a51bc7f3140d16f1bf"),
    userId: "66be145c1bc7f3140d16f147",
    activityId: ObjectId("66be158a1bc7f3140d16f1b1"),
    title: "任务1112222",
    description: "111",
    deadline: "2024-08-16",
    assigneeId: ObjectId("66be14b41bc7f3140d16f165"),
    status: "0",
    createdAt: ISODate("2024-08-15T14:50:13.807Z"),
    updatedAt: ISODate("2024-08-15T14:50:33.256Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("task").insert([ {
    _id: ObjectId("66be15b01bc7f3140d16f1c5"),
    userId: "66be145c1bc7f3140d16f147",
    activityId: ObjectId("66be158a1bc7f3140d16f1b1"),
    title: "222",
    description: "22",
    deadline: "2024-08-30",
    assigneeId: ObjectId("66be14b41bc7f3140d16f165"),
    status: "0",
    createdAt: ISODate("2024-08-15T14:50:24.788Z"),
    updatedAt: ISODate("2024-08-16T01:22:51.117Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for user
// ----------------------------
db.getCollection("user").drop();
db.createCollection("user");
db.getCollection("user").createIndex({
    "$**": "text"
}, {
    name: "username",
    weights: {
        "$**": NumberInt("1")
    },
    default_language: "english",
    language_override: "language",
    textIndexVersion: NumberInt("3")
});
db.getCollection("user").createIndex({
    username: NumberInt("1")
}, {
    name: "新索引名称"
});
db.getCollection("user").createIndex({
    username: NumberInt("1")
}, {
    name: "username_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of user
// ----------------------------
db.getCollection("user").insert([ {
    _id: ObjectId("66be145c1bc7f3140d16f147"),
    username: "yokesh",
    password: "60759673bb62c9581ecd4946dd475d4a",
    email: "2480790748@qq.com",
    phone: "11",
    createdAt: ISODate("2024-08-15T14:44:44.361Z"),
    updatedAt: ISODate("2024-08-16T09:15:46.516Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user").insert([ {
    _id: ObjectId("66be161d1bc7f3140d16f1de"),
    username: "yoke0104x12345",
    password: "a2a7200f2a4f08feb2cc50335927cdd0",
    email: "24807907482@qq.com",
    phone: "17612165271",
    createdAt: ISODate("2024-08-15T14:52:13.726Z"),
    updatedAt: ISODate("2024-08-15T14:52:13.726Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user").insert([ {
    _id: ObjectId("66bf09f1130c01ee0a2862d1"),
    username: "superadmin",
    password: "a66abb5684c45962d887564f08346e8d",
    email: "admin1234@qq.com",
    createdAt: ISODate("2024-08-16T08:12:33.986Z"),
    updatedAt: ISODate("2024-08-16T09:56:51.908Z"),
    __v: NumberInt("0"),
    phone: "99999999111"
} ]);
db.getCollection("user").insert([ {
    _id: ObjectId("66bf1f1e2dabbff4deaedc8a"),
    username: "yoke",
    password: "ffe6fce0e1796797821b40fd7dc44c6a",
    email: "2@qq.com",
    phone: "17633465271222",
    createdAt: ISODate("2024-08-16T09:42:54.947Z"),
    updatedAt: ISODate("2024-08-16T09:55:02.71Z"),
    __v: NumberInt("0")
} ]);
