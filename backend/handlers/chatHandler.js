import User from "../models/userModel";
import Chat from "../models/chatModel";
import { catchWrap, catchWrapGenAnswer } from "../middleware/errorHandler";
import axios from "axios";
import { getName } from "../handlers/userHandler";
import getTime from "./timeHandler";
import { pushMessage } from "../socket";

const createChat = catchWrap(
  async (req, res, next) => {
    console.log("create chat");
    const user = req.user;
    const { targetId } = req.body;
    console.log(req.body);
    const match = user.chats.filter((chat) => chat.targetId === targetId);
    console.log("createChat match", match);
    if (match.length) {
      res
        .status(200)
        .json({ message: "Chat already created", chatId: match[0].chatId });
      return;
    }
    console.log(targetId);
    const targetUser = await User.findById(targetId);
    const newChat = new Chat({
      conversation: [],
      users: [req.user._id.toString(), targetId],
    });
    console.log("user obj", user);
    console.log("target obj", targetUser);
    user.chats.push({ chatId: newChat._id.toString(), targetId: targetId });
    targetUser.chats.push({
      chatId: newChat._id.toString(),
      targetId: user._id.toString(),
    });
    await Promise.all([
      user.save({ validateBeforeSave: false }),
      targetUser.save({ validateBeforeSave: false }),
      newChat.save(),
    ]);
    res
      .status(200)
      .json({ message: "Chat created", chatId: newChat._id.toString() });
  }
  //   500,
  //   "Internal server error"
);

// Reference: https://stackoverflow.com/questions/38663751/how-to-safely-render-html-in-react
import sanitizeHtml from "sanitize-html";

const renderAnswer = (input) => {
  const clean = sanitizeHtml(input, {
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: {
      a: ["href", "target"],
    },
  });
  return clean;
};

const processForm = (formData) => {
  return formData
    .map((symptom, index) => {
      const { title, duration, severity, frequency, description } = symptom;
      return `symptom ${
        index + 1
      }: title: ${title}, duration: ${duration}, severity (1-10): ${severity}, frequency: ${frequency}, description: ${description}`;
    })
    .join(", ");
};

const displayForm = (formData) => {
  return formData
    .map((symptom, index) => {
      const { title, duration, severity, frequency, description } = symptom;
      return `Information I currently have for this diagnosis:<br></br>Your profile information<br></br>Symptom ${
        index + 1
      }:<br></br>Title: <b>${renderAnswer(
        title
      )}</b><br></br>Duration: <b>${renderAnswer(
        duration
      )}</b><br></br>Severity (1-10): <b>${renderAnswer(
        severity
      )}</b><br></br>Frequency: <b>${renderAnswer(
        frequency
      )}</b><br></br>Description: <b>${renderAnswer(description)}</b>`;
    })
    .join("<br></br><br></br>");
};

const createGPTChat = catchWrap(
  async (req, res, next) => {
    console.log("create chat");
    const user = req.user;
    const { formData } = req.body;
    console.log(req.body);
    const time = getTime();
    const newChat = new Chat({
      conversation: [],
      users: [req.user._id.toString()],
      creationTime: time,
    });
    user.chats.push({ chatId: newChat._id.toString() });
    console.log("user obj", user);
    const message = processForm(formData);
    const displayed = displayForm(formData);
    newChat.conversation.push({
      sender_id: user._id.toString(),
      message: message,
      sentTime: time,
      render_text: displayed,
    });
    await Promise.all([
      user.save({ validateBeforeSave: false }),
      newChat.save(),
    ]);
    genAnswer(newChat._id.toString(), pushMessage(newChat));
    res
      .status(200)
      .json({ message: "Chat created", chatId: newChat._id.toString() });
  }
  //   500,
  //   "Internal server error"
);

const getChatContent = catchWrap(
  async (req, res, next) => {
    console.log("get chat content");
    if (!req.user) {
      throw new Error("no req user");
    }
    const chatId = req.params.chatId;
    console.log("chatId", chatId);
    console.log("req.user.chats", req.user.chats);
    if (!req.user.chats.some((chat) => chat.chatId === chatId)) {
      throw new Error("not in chats");
    }
    const chat = await Chat.findById(chatId);
    // const users = await Promise.all(chat.users.map((user) => user != req.user._id ? getName(user) : null).filter(v => v));
    res.status(200).json(chat);
  }
  //   401,
  //   "Unauthorized"
);
/*
Preview:
chatId: chatId
users: [names]
lastMessage: {sender name, message}
*/
const initGPT = async (chatId, user) => {
  const chat = await Chat.findById(chatId);
  if (chat.users.length !== 1) {
    return null;
  }
  // GPT chat
  return {
    chatId: chatId,
    restricted: chat.conversation.at(-1).sender_id !== "GPT",
  };
};

const getPreview = async (chatId, user) => {
  const chat = await Chat.findById(chatId);
  console.log(chat);
  const lmsg = chat.conversation.at(-1);
  console.log("gpv users", chat.users);
  console.log("gpv user", user);
  return {
    chatId: chatId,
    // users: await Promise.all(
    //   chat.users
    //     .filter((userId) => userId !== user._id)
    //     .map(async (userId) =>
    //       userId !== user._id ? await getName(userId) : undefined
    //     )
    users: chat.users.filter((userId) => userId !== user._id.toString()),
    // ),
    lastMessage: lmsg ?? null,
    // lastMessage: lmsg
    //   ? {
    //       message: lmsg.message,
    //       sender:
    //         lmsg.sender_id === user._id
    //           ? { first: "You", last: "" }
    //           : await getName(lmsg.sender_id),
    //     }
    //   : null,
    creationTime: chat.creationTime ?? null,
  };
};

// mainly for user sidebar chats list display
const getChats = catchWrap(
  async (req, res, next) => {
    if (!req.user) {
      throw new Error();
    }
    console.log("got get chats request");
    console.log("userchats", req.user.chats);
    const [ret, ret2] = await Promise.all([
      Promise.all(
        req.user.chats.map((chat) => getPreview(chat.chatId, req.user))
      ),
      Promise.all(req.user.chats.map((chat) => initGPT(chat.chatId, req.user))),
    ]);
    console.log("ret ret2:", ret, ret2);
    res.status(200).json({ chatPreviews: ret, gptStatus: ret2 });
  }
  //   401,
  //   "Unauthorized"
);

const genAnswer = catchWrapGenAnswer(async (chatId, messageCallback) => {
  // get chat history and prepend to request
  const chat = await Chat.findById(chatId);
  if (!chat || chat.users.length !== 1) {
    return;
  }
  const user = await User.findById(chat.users[0]);
  console.log(process.env["OPENAI_API_KEY"]);
  const context = {
    role: "system",
    message:
      "You are a general medical doctor. I will give you information about the user as well as a list of the user's symptoms, and you will give the user a diagnosis along with your percentage of confidence. You should aim for the highest confidence, so when needed, ask followup questions to gather more information. Then I'm going to tell you if you were right or wrong.",
  };
  const dataArray = user.dataArray;
  const profile = {
    role: "system",
    message:
      "Information about the user: " +
      "DOB: " +
      dataArray[0] +
      ", Height: " +
      dataArray[1] +
      "cm, Weight: " +
      dataArray[2] +
      "kg, Gender: " +
      dataArray[3] +
      ", Ethnicity: " +
      dataArray[4] +
      ". Current medical conditions: " +
      dataArray[5] +
      ", Previous medical conditions: " +
      dataArray[6] +
      ", Medications: " +
      dataArray[7] +
      ", Surgeries or procedures: " +
      dataArray[8] +
      ", Allergies: " +
      dataArray[9] +
      ", Family medical history: " +
      dataArray[10] +
      ". Diet: " +
      dataArray[11] +
      ", Exercise (1-5): " +
      dataArray[12] +
      ", Smoker: " +
      dataArray[13] +
      ", Alcohol consumption: " +
      dataArray[14] +
      ", Stress level (1-5): " +
      dataArray[15] +
      ", Sleep: " +
      dataArray[16] +
      "hours/night.",
  };
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        context,
        profile,
        ...chat.conversation.map((msg) => ({
          role: msg.sender_id === "GPT" ? "doctor" : "user",
          content: msg.gpt_text ?? msg.message,
        })),
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env["OPENAI_API_KEY"],
      },
    }
  );
  console.log(response);
  if (response.data.error) {
    console.log("Error", response.data.error);
  }
  const rmsg = response.data.choices[0].message.content;
  const rmsgobj = { sender_id: "GPT", message: rmsg, sentTime: getTime() };
  messageCallback(chatId, rmsgobj);
});

export {
  createChat,
  getChatContent,
  getChats,
  getPreview,
  genAnswer,
  createGPTChat,
};
