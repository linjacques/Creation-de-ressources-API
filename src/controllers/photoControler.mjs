import PhotoModel from '../models/photo.mjs';

class Photos {
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoModel);
    this.run();
  }

  showById() {
    // eslint-disable-next-line consistent-return
    this.app.get('/photo/:id', async (req, res) => {
      try {
        const photoDoc = await this.PhotoModel.findById(req.params.id).populate('album');
        if (!photoDoc) {
          return res.status(404).json({ message: 'Photos not found' });
        }
        const photo = photoDoc.toObject();
        if (photo.album && photo.album.photos) {
          delete photo.album.photos;
        }
        res.status(200).json(photo);
      } catch (err) {
        console.error(`[ERROR] photo/:id -> ${err}`);
        res.status(500).json({ message: 'internal server errror' });
      }
    });
  }

  create() {
    this.app.post('/photo', (req, res) => {
      try {
        const photo = new this.PhotoModel(req.body);
        photo.save()
          .then((savedPhoto) => savedPhoto.populate('album'))
          .then((populatedPhoto) => {
            res.status(201).json(populatedPhoto);
          })
          .catch((err) => {
            console.error(`[ERROR] photo/create -> ${err}`);
            res.status(400).json({ message: 'bad request' });
          });
      } catch (err) {
        console.error(`[ERROR] photo/create (catch global) -> ${err}`);
        res.status(500).json({ message: 'internal server error' });
      }
    });
  }

  async deleteById() {
    // eslint-disable-next-line consistent-return
    this.app.delete('/photo/:id', (req, res) => {
      try {
        const photo = this.PhotoModel.findByIdAndDelete(req.params.id);
        if (!photo) {
          return res.status(404).json({ message: 'Photos not found' });
        }
        res.json({ message: 'photos deleted' });
      } catch (err) {
        console.error(`[ERROR] photo/:id -> ${err}`);
        res.status(500).json({ message: 'internal server error' });
      }
    });
  }

  updateById() {
    this.app.put('/photo/:id', (req, res) => {
      try {
        const photoId = req.params.id;
        this.PhotoModel.findByIdAndUpdate(photoId, req.body, { new: true })
          // eslint-disable-next-line consistent-return
          .then((photo) => {
            if (!photo) {
              return res.status(404).json({
                code: 404,
                message: 'Photos not found'
              });
            }
            res.status(200).json(photo);
          })
          .catch((err) => {
            console.error('[ERROR] update photo/:id ->', err);
            res.status(500).json({
              code: 500,
              message: 'internal server error',
              error: err.message
            });
          });
      } catch (err) {
        console.error('[ERROR] photo/:id (global catch) ->', err);
        res.status(400).json({
          code: 400,
          message: 'bqd request'
        });
      }
    });
  }

  run() {
    this.create();
    this.showById();
    this.deleteById();
    this.updateById();
  }
}

export default Photos;
