import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TableHeadSelect } from "./table-head-select";

type Props = {
    headers: string[];
    body: string[][];
    selectedColumns: Record<string, string | null>;
    onTableHeadSelectChange: (columnIndex: number, value: string | null) => void;
};

export const ImportTable = ({
    headers,
    body,
    selectedColumns,
    onTableHeadSelectChange,
}: Props) => {
    return (
        <div className="rounded-md border overflow-hidden">
            <Table className="min-w-full">
                <TableHeader className="bg-muted">
                    <TableRow className="text-xl line-clamp-1">
                        {headers.map((header, index) => (
                            <TableHead key={index} className="px-4 py-2">
                                <TableHeadSelect
                                    columnIndex={index}
                                    selectedColumns={selectedColumns}
                                    onChange={onTableHeadSelectChange}
                                />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {body.map((row, rowIndex) => (
                        <TableRow key={rowIndex} className="hover:bg-gray-100">
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} className="px-4 py-2">
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
