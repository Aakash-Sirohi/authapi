export default function getotp(req: {
    body: {
        fdata: {
            email: any;
            phone: any;
        };
    };
}, res: {
    send: (arg0: {
        message: string;
    }) => void;
}): void;
