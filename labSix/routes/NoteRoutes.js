const express = require("express");
const router = express.Router();
const noteModel = require("../models/NotesModel.js");

router.post("/notes", (req, res) => {
  console.log("BODY::: ", req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  const note = new noteModel({
    noteTitle: req.body.noteTitle,
    noteDescription: req.body.noteDescription,
    priority: req.body.priority,
  });

  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
});

router.get("/notes", (req, res) => {
  noteModel
    .find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
});

router.get("/notes/:noteId", (req, res) => {
  noteModel
    .findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId,
      });
    });
});

router.put("/notes/:noteId", (req, res) => {
  // Validate request
  if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  noteModel
    .findByIdAndUpdate(
      req.params.noteId,
      {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
      },
      { new: true }
    )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
});

router.delete("/notes/:noteId", (req, res) => {
  noteModel
    .findByIdAndRemove(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId,
      });
    });
});

module.exports = router;
