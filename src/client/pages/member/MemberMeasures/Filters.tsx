import {
  Button,
  Divider,
  Fade,
  Paper,
  Popper,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BsLocalizationProvider from '../../../components/BsLocalizationProvider';

const FORMAT = 'DD/MM/YYYY';

const Container = styled(Box)({
  display: 'flex',
});

const DatesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  [theme.breakpoints.up('md')]: {
    display: 'grid',
    gap: '10px 10px',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: `
    "from to"
    "search search"
  `,
  },
}));

const ShortcutButton = styled(Button)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    color: selected ? theme.palette.primary.main : '#000',
    border: '1px #e6e6e6 solid',
  })
);

const shortcuts = [
  {
    id: 'last-year',
    label: 'Este Año',
    dates: {
      from: dayjs().startOf('year'),
      to: dayjs(),
    },
  },
  {
    id: 'last-six-months',
    label: 'Últimos 6 meses',
    dates: {
      from: dayjs().subtract(6, 'month'),
      to: dayjs(),
    },
  },
  {
    id: 'last-three-months',
    label: 'Últimos 3 meses',
    dates: {
      from: dayjs().subtract(3, 'month'),
      to: dayjs(),
    },
  },
];

function Filters(props: { onSearch: (from: Date, to: Date) => void }) {
  const { onSearch } = props;
  const [openPop, setOpenPop] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedShortcurt, setSelectedShortcut] =
    useState<string>('last-three-months');
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    const shortcut = shortcuts.find(({ id }) => id === selectedShortcurt);
    if (shortcut) {
      const { dates } = shortcut;
      setFromDate(dates.from);
      setToDate(dates.to);
    }
  }, [selectedShortcurt]);

  const handleShortcutClick = (id: string) => () => {
    setSelectedShortcut(id);
  };
  const handleDateChange = (type: 'from' | 'to') => (ev: unknown) => {
    const date = ev as dayjs.Dayjs;
    if (type === 'from') {
      setFromDate(date);
      return;
    }
    setToDate(date);
    setSelectedShortcut('');
  };

  const handlePopOpen = (ev: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(ev.currentTarget);
    setOpenPop((s) => !s);
  };

  const canBeOpen = openPop && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <Box
        onClick={handlePopOpen}
        area-aria-describedby={id}
        sx={{ display: 'flex', alignItems: 'end' }}
      >
        {fromDate && toDate && (
          <Typography variant="caption" component="span">
            {fromDate.format(FORMAT)} - {toDate.format(FORMAT)}
          </Typography>
        )}
        <FilterAltIcon
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          color={openPop ? 'primary' : undefined}
        />
      </Box>
      <Popper
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        transition
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ padding: '10px' }} elevation={3}>
              <Container>
                <Stack spacing={2}>
                  {shortcuts.map((sc) => (
                    <ShortcutButton
                      variant="text"
                      key={sc.id}
                      onClick={handleShortcutClick(sc.id)}
                      selected={sc.id === selectedShortcurt}
                    >
                      {sc.label}
                    </ShortcutButton>
                  ))}
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ margin: '0 10px' }}
                />
                <DatesContainer>
                  <Box sx={{ gridArea: 'from' }}>
                    <Typography>Desde:</Typography>
                    <BsLocalizationProvider>
                      <DatePicker
                        value={fromDate}
                        format={FORMAT}
                        onChange={handleDateChange('from')}
                        disableFuture
                        maxDate={toDate?.subtract(1, 'day')}
                      />
                    </BsLocalizationProvider>
                  </Box>
                  <Box sx={{ gridArea: 'to' }}>
                    <BsLocalizationProvider>
                      <Typography>Hasta:</Typography>
                      <DatePicker
                        value={toDate}
                        format={FORMAT}
                        onChange={handleDateChange('to')}
                        disableFuture
                        minDate={fromDate?.add(1, 'day')}
                      />
                    </BsLocalizationProvider>
                  </Box>
                  <Stack
                    justifyContent="right"
                    width="100%"
                    direction="row"
                    gap="10px"
                    sx={{ gridArea: 'search' }}
                  >
                    <Button sx={{ maxWidth: '150px' }} variant="outlined">
                      Buscar
                    </Button>
                    <Button
                      sx={{ maxWidth: '150px' }}
                      variant="outlined"
                      onClick={() => setOpenPop(false)}
                    >
                      Cerrar
                    </Button>
                  </Stack>
                </DatesContainer>
              </Container>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}

export default Filters;
