import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useGetFarmLoggingDataQuery } from "../../store/api/farmLoggingApi";

import { LogsTableComponent } from "./LogsTableComponent";

interface FormData {
  islandOwner: "Noita" | "Plsnoharm" | "Sangkasan";
  seedType: "@ITEMS_T5_FARM_CABBAGE_SEED" | "@ITEMS_T1_WORM";
  seedReturnCount: number;
  seedProduceCount: number;
  wormsGathered: number;
}

export function AlbionFarmLoggerComponent() {
  const { refetch } = useGetFarmLoggingDataQuery();
  const [formData, _setFormData] = useState<FormData>({
    islandOwner: "Noita",
    seedType: "@ITEMS_T5_FARM_CABBAGE_SEED",
    seedProduceCount: 0,
    seedReturnCount: 0,
    wormsGathered: 0,
  });

  function setFormData(value: Partial<FormData>) {
    _setFormData({ ...formData, ...value });
  }
  const setIslandOwner = (newOwner: FormData["islandOwner"]) =>
    setFormData({ islandOwner: newOwner });
  const setSeedType = (newSeedType: FormData["seedType"]) =>
    setFormData({ seedType: newSeedType });
  const setSeedReturnCount = (seedReturnCount: number) =>
    setFormData({ seedReturnCount });
  const setSeedProduceCount = (seedProduceCount: number) =>
    setFormData({ seedProduceCount });
  const setWormsGatehred = (wormsGathered: number) => {
    setFormData({ wormsGathered });
  };

  async function handleSubmit() {
    await axios.post(`${import.meta.env.VITE_BASE_API_URL}/farm-logging`, formData);
    refetch();
  }

  return (
    <div>
      <Box sx={{ minWidth: 120, p: 1 }}>
        <Stack direction="row" spacing={5}>
          <Box>
            <Stack direction="row" spacing={5}>
              {/* ~ Island owner input */}
              <Box sx={{ width: 200, p: 1 }}>
                <InputLabel id="owner-select-label">Island Owner</InputLabel>
                <Select
                  labelId="owner-select-label"
                  id="owner-input-select"
                  value={formData.islandOwner}
                  onChange={(value) =>
                    setIslandOwner(
                      value.target.value as FormData["islandOwner"]
                    )
                  }
                  fullWidth
                >
                  <MenuItem value="Noita">Noita</MenuItem>
                  <MenuItem value="Plsnoharm">Plsnoharm</MenuItem>
                  <MenuItem value="Sangkasan">Sangkasan</MenuItem>
                </Select>
              </Box>
              {/* ~ Seed type input */}
              <Box sx={{ width: 200, p: 1 }}>
                <InputLabel id="seed-select-label">Seed Type</InputLabel>
                <Select
                  labelId="seed-select-label"
                  id="seed-input-select"
                  value={formData.seedType}
                  onChange={(value) =>
                    setSeedType(value.target.value as FormData["seedType"])
                  }
                  fullWidth
                >
                  <MenuItem value="@ITEMS_T5_FARM_CABBAGE_SEED">
                    Cabbage
                  </MenuItem>
                  <MenuItem value="@ITEMS_T1_WORM">Worm</MenuItem>
                </Select>
              </Box>
              {/* ~ Island owner input */}
            </Stack>
            <Stack direction="row" spacing={5}>
              <Box sx={{ width: 200, p: 1 }}>
                <TextField
                  label="Seeds Gathered"
                  type="number"
                  value={formData.seedReturnCount}
                  onChange={(value) => setSeedReturnCount(+value.target.value)}
                  fullWidth
                />
              </Box>
              <Box sx={{ width: 200, p: 1 }}>
                <TextField
                  label="Produce Gathered"
                  type="number"
                  value={formData.seedProduceCount}
                  onChange={(value) => setSeedProduceCount(+value.target.value)}
                  fullWidth
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={5}>
              <Box sx={{ width: 200, p: 1 }}>
                <TextField
                  label="Worms Gathered"
                  type="number"
                  value={formData.wormsGathered}
                  onChange={(value) => setWormsGatehred(+value.target.value)}
                  fullWidth
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Stack>
          </Box>
          <Typography>other content.</Typography>
        </Stack>
      </Box>
      <LogsTableComponent />
    </div>
  );
}
