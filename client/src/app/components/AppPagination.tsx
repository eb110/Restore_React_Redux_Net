import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/types";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export const AppPagination = ({ metaData, onPageChange }: Props): React.ReactNode => {
    const{totalPages, currentPage, totalCount, pageSize} = metaData;

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>
            Displaying{(currentPage - 1) * pageSize + 1}-
            {currentPage*pageSize > totalCount ? totalCount : currentPage*pageSize} of {totalCount} items</Typography>
        <Pagination
          color="secondary"
          size="large"
          count={totalPages}
          page={currentPage}
          onChange={(_, page):void => onPageChange(page)}
        />
      </Box>
    </>
  );
};

//pg 6 skok co 6 wzor od 1 - 6 = 7 - 12 / 13 - 18
//(1-1) * 6 + 1 = 1
//                7           13
