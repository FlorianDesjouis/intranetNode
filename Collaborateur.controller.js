const Collaborateur = require('./Collaborateur.model')

module.exports = {

    //Get /collaborateurs get all users
    findAll : (req, res) => {
        Collaborateur.find({})
		.exec()
		.then(collaborateurs => {
            if(collaborateurs === null){
                return res.status(500).json({error: 1, message: "No collabo found"})
            }else {
                res.json(collaborateurs)
            }
        })
        .catch(err => res.status(500).json({error:1, message:err.message}))
    },
    findOne : (req, res) => {
        Collaborateur.findById(req.params.id)
            .exec()
            .then(collaborateur => {
                if(collaborateur === null){
                    return res.status(500).json({error: 1, message: "No collabo found"})
                }else {
                    res.json(collaborateur)
                }
            })
            .catch(err => res.status(500).json({error:1, message:err.message}))
    },
    create: (req, res) => {
        Collaborateur.create(req.body)
            .then(collaborateur => res.json({success:1, message:'Collabo created', inserted:collaborateur}))
            .catch(err => res.status(500).json({error: 1, message: err.message}))
    },
    update: (req, res) => {
        Collaborateur.findByIdAndUpdate(req.params.id, req.body)
            .exec()
            .then(collaborateur => {
                if(collaborateur === null){
                    return res.status(500).json({error: 1, message: "N collabo found"})
                }else {
                    res.send('updated user')
                }
            })
            .catch(err => res.status(500).json({error:1, message:err.message}))  
    },
    remove: (req, res) => {
        Collaborateur.findByIdAndRemove(req.params.id)
            .exec()
            .then(collaborateur => {
                if(collaborateur === null){
                    return res.status(500).json({error: 1, message: "No collabo found"})
                }else {
                    res.send('deleted user')
                }
            })
    }

}