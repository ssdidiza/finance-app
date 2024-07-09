import { Upload } from 'lucide-react';  // Fixed import for the Upload icon
import { useCSVReader } from "react-papaparse";
import { Button } from '@/components/ui/button';

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  // TODO: Add a paywall - do not remove this comment until paywall is implemented
  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button
          size="sm"
          className="w-full lg:w-auto"
          {...getRootProps()}
        >
          <Upload className="w-4 h-4 mr-2" />  {/* Corrected className for consistent sizing */}
          Import
        </Button>
      )}
    </CSVReader>
  );
};
