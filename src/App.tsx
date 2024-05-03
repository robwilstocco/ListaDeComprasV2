import "./index.scss";
import { useEffect, useState } from "react";
import { Checklist, AddCircleOutline, Add, Delete, Close } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import IListaDeCompras from "./interfaces/IListaDeCompras";
import {
  Alert,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";

function App() {
  
  const itens: IListaDeCompras[] = JSON.parse(localStorage.getItem('lista') as string);
  const [descricao, setDescricao] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [listaDeCompras, setListaDeCompras] = useState<IListaDeCompras[]>(itens);
  const [idsSelecionados, setIdsSelecionados] = useState<GridRowId[]>([]);
  const [validaDescricao, setValidaDescricao] = useState<boolean>(false);
  const [validaQuantidade, setValidaQuantidade] = useState<boolean>(false);
  const [alerta, setAlerta] = useState<boolean>(false);
  const [aba, setAba] = useState<number>(0);

  useEffect(()=>{
    localStorage.setItem('lista', JSON.stringify(listaDeCompras))
  },[listaDeCompras])

  const columns: GridColDef[] = [
    {
      field: "descricao",
      headerName: "Descrição",
      width: 130,
    },
    {
      field: "quantidade",
      headerName: "Qtd",
      width: 100,
    },
  ];

  const validaCampos = ():boolean =>{
    let mensagem = false;

    if(!descricao){
      setValidaDescricao(true);
      mensagem = true;
    }else{
      setValidaDescricao(false);
    }

    if(!quantidade){
      setValidaQuantidade(true);
      mensagem = true;
    }else{
      setValidaQuantidade(false);
    }
    return mensagem
  }

  const inserirLinha = ():void => {
    if(validaCampos()){
      setAlerta(true)
      return;
    }

    let item: IListaDeCompras = {
      id: 0,
      descricao: descricao,
      quantidade: quantidade
    }

    if(listaDeCompras.length > 0 ){
      item.id = listaDeCompras[listaDeCompras.length -1].id + 1;
    }

    
    setListaDeCompras(prev => [...prev, item]);
    setAba(1);

    setDescricao('');
    setQuantidade('');
  }

  const deletarLinha = ():void => {
    
    if (idsSelecionados.length === listaDeCompras.length){
      setListaDeCompras([]);
      return
    }
    let listaAntiga = [...listaDeCompras];
    idsSelecionados.forEach(id => listaAntiga.splice(Number(id),1))
    setListaDeCompras([...listaAntiga])
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alerta}
        autoHideDuration={3000}
        onClose={() => setAlerta(false)}
      >
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlerta(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          Preencha Todos os campos!
        </Alert>
      </Snackbar>
      
      <Box className="container">
        <header className="cabecalho">
          <h1 className="cabecalho__titulo">Lista de Compras</h1>
        </header>
        <section className="content">
          <Paper
            elevation={15}
            className={`content__card${aba === 1 ? " hidden" : ""}`}
          >
            <h2 className="content__card__titulo">Adicionar Item</h2>
            <TextField
              required
              label="Descrição"
              value={descricao}
              onChange={(event) => {
                setDescricao(event.target.value);
              }}
              error={validaDescricao}
              className="content__card__input"
            />
            <TextField
              required
              label="Quantidade"
              value={quantidade}
              onChange={(event) => {
                setQuantidade(event.target.value);
              }}
              error={validaQuantidade}
              className="content__card__input"
            />
            <IconButton
              className="content__card__button"
              onClick={inserirLinha}
            >
              <Add fontSize="large" />
            </IconButton>
          </Paper>

          <Paper
            elevation={15}
            className={`content__card${aba === 0 ? " hidden" : ""}`}
          >
            <h2 className="content__card__titulo">Lista de Itens</h2>
            <Box sx={{ height: '320px', width: "100%" }}>
              <DataGrid
                rows={listaDeCompras}
                columns={columns}
                density="compact"
                disableColumnMenu
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(row) => setIdsSelecionados(row)}
              />
            </Box>
            <IconButton disabled={idsSelecionados.length === 0} className="content__card__button" onClick={deletarLinha}>
              <Delete fontSize="large" />
            </IconButton>
          </Paper>
        </section>

        <BottomNavigation
          className="menu"
          showLabels
          value={aba}
          onChange={(event, newValue) => {
            event
            setAba(newValue);
          }}
        >
          <BottomNavigationAction
            label="Criar Lista"
            icon={<AddCircleOutline fontSize="large" />}
          />
          <BottomNavigationAction
            label="Minha Lista"
            icon={<Checklist fontSize="large" />}
          />
        </BottomNavigation>
      </Box>
    </>
  );
}

export default App;
