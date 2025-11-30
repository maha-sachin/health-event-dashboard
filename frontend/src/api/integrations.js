import { healthEventsClient } from "./healthEventsClient";

export const Core = healthEventsClient.integrations.Core;

export const InvokeLLM = healthEventsClient.integrations.Core.InvokeLLM;

export const SendEmail = healthEventsClient.integrations.Core.SendEmail;

export const SendSMS = healthEventsClient.integrations.Core.SendSMS;

export const UploadFile = healthEventsClient.integrations.Core.UploadFile;

export const GenerateImage = healthEventsClient.integrations.Core.GenerateImage;

export const ExtractDataFromUploadedFile =
  healthEventsClient.integrations.Core.ExtractDataFromUploadedFile;
