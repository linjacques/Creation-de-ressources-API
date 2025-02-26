import PhotoModel from '../models/photo.mjs';

class Photos {
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoModel);
    this.run();
  }

  async showById() {
    // eslint-disable-next-line consistent-return
    this.app.get('/photo/:id', (req, res) => {
      try {
        const photo = this.PhotoModel.findById(req.params.id).populate('album');
        if (!photo) {
          return res.status(404).json({ message: 'Photo non trouvée' });
        }
        res.json(photo);
      } catch (err) {
        console.error(`[ERROR] photo/:id -> ${err}`);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  async create() {
    this.app.post('/photo/', (req, res) => {
      try {
        const photo = new this.PhotoModel(req.body).save();
        res.status(201).json(photo || {});
      } catch (err) {
        console.error(`[ERROR] photo/create -> ${err}`);
        res.status(400).json({ message: 'Requête incorrecte' });
      }
    });
  }

  async deleteById() {
    // eslint-disable-next-line consistent-return
    this.app.delete('/photo/:id', (req, res) => {
      try {
        const photo = this.PhotoModel.findByIdAndDelete(req.params.id);
        if (!photo) {
          return res.status(404).json({ message: 'Photo non trouvée' });
        }
        res.json({ message: 'Photo supprimée avec succès' });
      } catch (err) {
        console.error(`[ERROR] photo/:id -> ${err}`);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.showById();
    this.deleteById();
  }
}

export default Photos;
