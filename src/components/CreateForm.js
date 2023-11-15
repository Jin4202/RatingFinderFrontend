import React from "react";

export default function CreateForm() {
  return (
    <form>
      <div className="form-group">
        <input type="text" className="form-control" id="name" name="name" />
        <label htmlFor="name">Product Title</label>
        
      </div>
    </form>
  );
}
