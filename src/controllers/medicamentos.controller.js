const medicamentosCtrl = {};

const pool = require('../database');

medicamentosCtrl.renderAddMedicamentos = (req, res) => {
    res.render('task/add');
};

medicamentosCtrl.addMedicamentos = async (req, res) => {
    const { IDMedicar, Molecula,Nivel1,Nivel2,CodHomologoMedIns} = req.body;
    const newMedicamentos = {
        IDMedicar,
        Molecula,
        Nivel1,
        Nivel2,
        CodHomologoMedIns,
        create_at,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO medicamentos set ?', [newMedicamentos]);
    req.flash('success_msg', 'Solicitud cargada Satisfactoriamente');
    res.redirect('/medicamentos/add');
}

medicamentosCtrl.renderMedicamentos = async (req, res) => {
    const medicamentos = await pool.query('SELECT * FROM medicamentos', );
    res.render('/list_medicamentos', { medicamentos });
}




medicamentosCtrl.deleteMedicamentos = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM medicamentos WHERE ID = ?', [id]);
    req.flash('success_msg', 'Medicamento Removido Satisfactoriamente');
    res.redirect('/medicamentos');
};

medicamentosCtrl.renderEditMedicamentos = async (req, res) => {
    const { id } = req.params;
    const medicamentos = await pool.query('SELECT * FROM medicamentos WHERE id = ?', [id]);
    console.log(medicamentos);
    res.render('medicamentos/edit_medicamentos', {medicamentos: medicamentos[0]});
};






medicamentosCtrl.editMedicamentos = async (req,res) => {
    const { id } = req.params;
    const { IDMedicar, Molecula,Nivel1,Nivel2,CodHomologoMedIns,} = req.body; 
    const newMedicamentos = {
        IDMedicar,
        Molecula,
        Nivel1,
        Nivel2,
        CodHomologoMedIns,
    };
    
    
    await pool.query('UPDATE medicamentos set ? WHERE id = ?', [newMedicamentos, id]);
    req.flash('success_msg', 'Medicamento Actualizado Satisfactoriamente');
    res.redirect('/medicamentos');
}




module.exports = medicamentosCtrl;