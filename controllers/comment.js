const { query } = require('express');
const Comment = require('../models/Comment')

const controller = {
    create: async (req, res) => {
        let { user } = req;
        try {
            let new_comment = await Comment.create({
                    userId: user.id,
                    showId: req.body.showId,
                    itineraryId: req.body.itineraryId,
                    date: req.body.date,
                    comment: req.body.comment
            })
            res.status(200).json({
                response: new_comment,
                success: true,
                message: 'The Comment was successfully created.',
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },
    read: async (req, res) => {
        let { query } = req.params
        let { date } = req.query
        if (req.query.showId) {
            query = { showId: req.query.showId}
        }
        if (req.query.itineraryId) {
          query = { itineraryId: req.query.itineraryId};
        }
        if (req.query.date) {
            date = { date: req.query.date }
        }
        try {
            let comments = await Comment.find(query).sort({ date: -1 }).populate('userId')
            if (comments.length >= 1) {
                res.status(200).json({
                    data: comments,
                    success: true,
                    message: 'Comments successfully founded.',

                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No Comments founded',
                })
            }
        }catch(error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },
    update:async (req, res) => {
        let { id } = req.params;
        let { user } = req
        try {
          let comment = await Comment.findOneAndUpdate({ _id: id }, {
            comment: req.body.comment,
            showId: req.body.showId,
            itineraryId: req.body.itineraryId,
            date: req.body.date,
            userId: user.id
            
          }, {
            new: true,
          });
          if (comment) {
            res.status(200).json({
              id: comment._id,
              success: true,
              message: "The Comment has been modified succesfully",
            });
          } else {
            res.status(404).json({
              success: false,
              message: "The comment was't found",
            });
          }
        } catch (error) {
          res.status(400).json({
            success: false,
            message: error.message,
          });
        }
      },
    destroy:async (req, res) => {
        let { id } = req.params;
        try {
          let oneComment = await Comment.findOneAndDelete({ _id: id});
          if (oneComment) {
            res.status(200).json({
              success: true,
              message: "The comment has been deleted succesfully",
            });
          } else {
            res.status(404).json({
              success: false,
              message: "The comment was't found",
            });
          }
        } catch (error) {
          res.status(400).json({
            success: false,
            message: error.message,
          });
        }
      },
}
module.exports = controller;