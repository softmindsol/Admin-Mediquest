// import decryptNumber from "./decryptKey";
// import caesarCipherDecrypt from "./decryptQuestions";

// const decryptQuestionData = (question, secretKey) => {
//   const decryptedStatus = decryptNumber(question.status, secretKey);
//   const decryptedQuestion = caesarCipherDecrypt(
//     question.question,
//     decryptedStatus
//   );
//   const decryptedOptions = question.options.map((option) =>
//     caesarCipherDecrypt(option, decryptedStatus)
//   );

//   return {
//     ...question,
//     question: decryptedQuestion,
//     options: decryptedOptions,
//   };
// };

// export default decryptQuestionData;

import decryptNumber from "./decryptKey";
import caesarCipherDecrypt from "./decryptQuestions";

const decryptQuestionData = (question, secretKey) => {
  const decryptedStatus = decryptNumber(
    question?.content?.questions?.status,
    secretKey
  ); // Decrypt the status
  const decryptedQuestion = caesarCipherDecrypt(
    question.content.questions.question,
    decryptedStatus
  ); // Decrypt the main question text

  const decryptedOptions = question.content.questions.options.map((option) =>
    caesarCipherDecrypt(option, decryptedStatus)
  );

  return {
    ...question,
    content: {
      ...question.content,
      questions: {
        ...question.content.questions,
        question: decryptedQuestion,
        options: decryptedOptions,
      },
    },
  };
};

export default decryptQuestionData;
