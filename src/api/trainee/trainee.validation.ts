import { validationService } from "../../services/validation.service";
import { TTraineeMetricsDto } from "./trainee.type";

export const validateTraineeMetrics = (metricsDto?: TTraineeMetricsDto) => {
  const errors: string[] = [];

  const weightError = validationService.validateNumbers(
    "Weight",
    metricsDto?.weight
  );
  if (weightError) errors.push(weightError);

  const heightError = validationService.validateNumbers(
    "Height",
    metricsDto?.height
  );
  if (heightError) errors.push(heightError);

  const ageError = validationService.validateNumbers("Age", metricsDto?.age);
  if (ageError) errors.push(ageError);

  const heartRateError = validationService.validateNumbers(
    "Heart Rate",
    metricsDto?.heartRate
  );
  if (heartRateError) errors.push(heartRateError);

  const bloodPressureSystoleError = validationService.validateNumbers(
    "Blood Pressure Systole",
    metricsDto?.bloodPressureSystole
  );
  if (bloodPressureSystoleError) errors.push(bloodPressureSystoleError);

  const bloodPressureDiastoleError = validationService.validateNumbers(
    "Blood Pressure Diastole",
    metricsDto?.bloodPressureDiastole
  );
  if (bloodPressureDiastoleError) errors.push(bloodPressureDiastoleError);

  return errors;
};
