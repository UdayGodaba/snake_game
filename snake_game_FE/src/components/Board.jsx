import { Box, Grid } from "@mui/material";

const Board = ({ board }) => {
  const noOfRowItems = Math.sqrt(board.length);
  const gridWidth = noOfRowItems * 30 + noOfRowItems * 2;

  return (
    <div>
      <Grid
        container
        width={`${gridWidth}px`}
        style={{ outline: "2px solid black" }}
      >
        {board.map((cell, index) => (
          <Grid item key={index} sx={{ padding: "1px" }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: `${board[index].color}`,
              }}
            ></Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Board;
