const videoModel = require("../../models/video");
const commentModel = require("../../models/comment");
exports.search = async (req, res) => {
  const keywords = req.query.keywords;
    try {
        const videos = await videoModel.find();
        const minimumPercentage = 50;
        var videosWithKeywords = [];
        for (const video of videos) {
            // Retrieve all comments associated with the video
            const comments = await commentModel.find({ idVideo: video._id });
        
            // Count the number of comments containing the keywords
            const keywordComments = comments.filter((comment) => {
              return keywords.split(" ").some((keyword) => comment.comment.includes(keyword));
            });
        
            // Calculate the percentage of comments containing the keywords
            const percentage = (keywordComments.length / comments.length) * 100;
        
            // If the percentage is at least 70%, add the video to the result
            console.log(video,percentage)
            if (percentage >= 50) {
              videosWithKeywords.push(video);
            }
          }
          console.log(videosWithKeywords)
        res.status(200).send({
          videosWithKeywords
        });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
};
