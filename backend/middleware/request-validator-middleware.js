const requestValidator = (type, req, res, next) => {
  const { task, category, isCompleted } = req.body;

  const errors = [];

  if (!task) {
    errors.push("Task is required");
  } else if (task.length < 3) {
    errors.push("Task length must be greater than 3 ");
  }

  const validCategories = ["Work", "Personal", "Home", "Urgent"];

  if (!category) {
    errors.push("category is required");
  } else if (!validCategories.includes(category)) {
    errors.push(
      `Invalid category. Please use one of the following: ${validCategories.join(
        ", "
      )}.`
    );
  }

  if (type === "edit" && isCompleted === undefined) {
    errors.push("IsCompleted is required!");
  } else if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
    errors.push("IsCompleted must be a boolean!");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  next();
  
};

module.exports = requestValidator;
