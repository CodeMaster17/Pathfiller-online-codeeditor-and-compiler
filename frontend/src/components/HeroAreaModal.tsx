
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { SocialIcons } from "./SocialIcons";

export function HeroAreaModal({ open, onClose }: { open: boolean; onClose: () => void }) {


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="py-8 px-8 min-w-[50vw] ">


                <div className="flex items-center w-full justify-between">
                    <div className="flex justify-center items-center w-1/2 h-full">
                        <img src="/my-image.png" alt="placeholder" className="rounded-full w-80 h-80" />
                    </div>
                    <div className="w-1/2">
                        <div className=" font-bold h2">
                            <p>Hi!👋 I'm
                                <span
                                    className={`bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text`}
                                >
                                    &nbsp; Harshit.
                                </span>
                            </p>
                        </div>
                        <div className="w-full mt-4">
                            <p className="h4 font-semibold">
                                I am creator of &nbsp;
                                <span className={`bg-gradient-to-r from-rose-400 to-purple-400 text-transparent bg-clip-text`}>Pathfiller.</span>
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">I'd love to connect and hear what you think – or just say hi! 😄</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">Want to get in touch?</p>
                            <div className="mt-2">
                                <SocialIcons />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
