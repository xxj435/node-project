const {
  Video
} = require('../model/index')
// 视频列表
exports.videolist = async (req, res) => {
  let {
    pageNum = 1, pageSize = 10
  } = req.body
  let videolist = await Video.find().skip((pageNum - 1) * pageSize).limit(pageSize).sort({
    creatAt: -1
  }).populate('user') // 找到所有视频  搜索条件
  // 总条数
  let getvideoCount = await Video.countDocuments()
  res.status(200).json({
    videolist,
    getvideoCount
  })
}

// 创建视频
exports.createvideo = async (req, res) => {
  let body = req.body
  body.user = req.user._id
  const videoModel = new Video(body)

  try {
    let dbBack = await videoModel.save()
    res.status(201).json({
      dbBack
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
  res.send(req.body)
}


// 视频详情
exports.video = async (req, res) => {
  console.log(req.params);
  const {
    videoId
  } = req.params;
  let videoinfo = await Video.findById(videoId).populate('user', '_id username cover')
  res.status(200).json(videoinfo)
}


// 添加视频评论
exports.comment = async (req, res) => {

}
