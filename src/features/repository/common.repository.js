class CommonRepository {
  //1. Add Data into DB
  async add(data, model) {
    try {
      let result = await new model(data);
      return result.save();
    } catch (err) {
      console.log("Error in Repository", err);
    }
  }

  // 2. Get All Lists
  async get(model, condition, projection) {
    try {
      const result = await model.find(condition).select(projection);
      return result;
    } catch (err) {
      console.log("Error in fetching lists", err);
    }
  }

  async findbyEmail(email, model) {
      try {
        return await model.findOne({ email: email });
      } catch (err) {
        console.log("Error ", err);
      }
    }

  // 4. Get By Id Details 
  async getById(id, model) {
    try {
      const result = await model.findById(id);
      console.log(result);
      return result;
    } catch (err) {
      console.log("Error in fetching lists", err);
    }
  }
  // 3. Delete a Blog
  async delete(filter, update, model) {
    try {
      const result = await model.findOneAndUpdate(filter, update);
      return result;
    } catch (err) {
      console.log("Error in delete data", err);
    }
  }

  // 4. Blog Updated
  async update(blogId, update, model) {
    try {
        const result = await model.findOneAndUpdate({"_id": blogId}, update);
        return result;
    } catch (err) {
      console.log("Error in delete data", err);
    }
  }

}

export default CommonRepository;
