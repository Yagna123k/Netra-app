import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, Ear, CircleCheck as CheckCircle, Volume2, VolumeX } from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type TestStep = 'intro' | 'testing' | 'results';

interface FrequencyTest {
    frequency: number;
    label: string;
    heard: boolean | null;
}

type HearingTestNavigationProp = StackNavigationProp<RootStackParamList, 'HearingTest'>;

interface Props {
    navigation: HearingTestNavigationProp;
}

const HearingTest: React.FC<Props> = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState<TestStep>('intro');
    const [currentFrequency, setCurrentFrequency] = useState(0);
    const [volumeLevel, setVolumeLevel] = useState(50);
    const [frequencies, setFrequencies] = useState<FrequencyTest[]>([
        { frequency: 250, label: 'Low (250 Hz)', heard: null },
        { frequency: 500, label: 'Low-Mid (500 Hz)', heard: null },
        { frequency: 1000, label: 'Mid (1000 Hz)', heard: null },
        { frequency: 2000, label: 'Mid-High (2000 Hz)', heard: null },
        { frequency: 4000, label: 'High (4000 Hz)', heard: null },
    ]);

    const startTest = () => {
        setCurrentStep('testing');
        setCurrentFrequency(0);
    };

    const handleResponse = (heard: boolean) => {
        const newFrequencies = [...frequencies];
        newFrequencies[currentFrequency].heard = heard;
        setFrequencies(newFrequencies);

        if (currentFrequency < frequencies.length - 1) {
            setCurrentFrequency(currentFrequency + 1);
        } else {
            setCurrentStep('results');
        }
    };

    const calculateHearingScore = () => {
        const heardCount = frequencies.filter(f => f.heard).length;
        return Math.round((heardCount / frequencies.length) * 100);
    };

    const getHearingAssessment = () => {
        const score = calculateHearingScore();
        if (score >= 80) {
            return {
                title: 'Good Hearing',
                description: 'Your test results indicate good hearing across most frequencies.',
                color: '#059669',
                icon: CheckCircle,
            };
        } else if (score >= 60) {
            return {
                title: 'Mild Hearing Loss',
                description: 'You may have difficulty hearing some frequencies. Consider a professional evaluation.',
                color: '#D97706',
                icon: Volume2,
            };
        } else {
            return {
                title: 'Significant Hearing Loss',
                description: 'We recommend consulting an audiologist for a comprehensive hearing evaluation.',
                color: '#DC2626',
                icon: VolumeX,
            };
        }
    };

    const renderIntro = () => (
        <View style={styles.content}>
            <View style={styles.iconContainer}>
                <Ear size={64} color="#D97706" strokeWidth={2} />
            </View>
            <Text style={styles.introTitle}>Hearing Test</Text>
            <Text style={styles.introText}>
                This test will check your ability to hear different sound frequencies. Make sure you're in a quiet environment.
            </Text>

            <View style={styles.instructionsCard}>
                <Text style={styles.instructionsTitle}>Before you begin:</Text>
                <View style={styles.instructionItem}>
                    <CheckCircle size={20} color="#059669" strokeWidth={2} />
                    <Text style={styles.instructionText}>Find a quiet room</Text>
                </View>
                <View style={styles.instructionItem}>
                    <CheckCircle size={20} color="#059669" strokeWidth={2} />
                    <Text style={styles.instructionText}>Use headphones for best results</Text>
                </View>
                <View style={styles.instructionItem}>
                    <CheckCircle size={20} color="#059669" strokeWidth={2} />
                    <Text style={styles.instructionText}>Set volume to comfortable level</Text>
                </View>
                <View style={styles.instructionItem}>
                    <CheckCircle size={20} color="#059669" strokeWidth={2} />
                    <Text style={styles.instructionText}>Indicate if you can hear each tone</Text>
                </View>
            </View>

            <View style={styles.volumeControl}>
                <Text style={styles.volumeLabel}>Volume Level: {volumeLevel}%</Text>
                <View style={styles.volumeBar}>
                    <View style={[styles.volumeFill, { width: `${volumeLevel}%` }]} />
                </View>
                <View style={styles.volumeButtons}>
                    <TouchableOpacity
                        style={styles.volumeButton}
                        onPress={() => setVolumeLevel(Math.max(0, volumeLevel - 10))}
                        activeOpacity={0.7}>
                        <Text style={styles.volumeButtonText}>Lower</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.volumeButton}
                        onPress={() => setVolumeLevel(Math.min(100, volumeLevel + 10))}
                        activeOpacity={0.7}>
                        <Text style={styles.volumeButtonText}>Higher</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.warningCard}>
                <Text style={styles.warningText}>
                    Note: This is a basic screening tool. For accurate diagnosis, consult a licensed audiologist.
                </Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={startTest} activeOpacity={0.8}>
                <Text style={styles.primaryButtonText}>Start Test</Text>
            </TouchableOpacity>
        </View>
    );

    const renderTesting = () => (
        <View style={styles.content}>
            <View style={styles.progressBar}>
                <View style={styles.progressBackground}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${((currentFrequency + 1) / frequencies.length) * 100}%` },
                        ]}
                    />
                </View>
                <Text style={styles.progressText}>
                    {currentFrequency + 1} of {frequencies.length}
                </Text>
            </View>

            <Text style={styles.questionTitle}>Testing Frequency</Text>
            <Text style={styles.frequencyLabel}>{frequencies[currentFrequency].label}</Text>

            <View style={styles.soundVisualizer}>
                <Volume2 size={80} color="#D97706" strokeWidth={2} />
                <Text style={styles.visualizerText}>Tone playing...</Text>
                <Text style={styles.visualizerSubtext}>Listen carefully for the sound</Text>
            </View>

            <TouchableOpacity
                style={styles.playButton}
                onPress={() => { }}
                activeOpacity={0.7}>
                <Text style={styles.playButtonText}>Play Tone Again</Text>
            </TouchableOpacity>

            <View style={styles.responseButtons}>
                <TouchableOpacity
                    style={[styles.responseButton, styles.noButton]}
                    onPress={() => handleResponse(false)}
                    activeOpacity={0.8}>
                    <VolumeX size={24} color="#FFFFFF" strokeWidth={2} />
                    <Text style={styles.responseButtonText}>Can't Hear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.responseButton, styles.yesButton]}
                    onPress={() => handleResponse(true)}
                    activeOpacity={0.8}>
                    <Volume2 size={24} color="#FFFFFF" strokeWidth={2} />
                    <Text style={styles.responseButtonText}>Can Hear</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderResults = () => {
        const assessment = getHearingAssessment();
        const Icon = assessment.icon;
        const score = calculateHearingScore();

        return (
            <View style={styles.content}>
                <View style={[styles.resultIconContainer, { backgroundColor: `${assessment.color}15` }]}>
                    <Icon size={64} color={assessment.color} strokeWidth={2} />
                </View>
                <Text style={styles.resultsTitle}>{assessment.title}</Text>
                <Text style={styles.resultsText}>{assessment.description}</Text>

                <View style={styles.resultsCard}>
                    <View style={styles.resultItem}>
                        <Text style={styles.resultLabel}>Hearing Score</Text>
                        <Text style={[styles.resultValue, { color: assessment.color }]}>{score}%</Text>
                    </View>
                </View>

                <View style={styles.frequencyResults}>
                    <Text style={styles.frequencyResultsTitle}>Frequency Results</Text>
                    {frequencies.map((freq, index) => (
                        <View key={index} style={styles.frequencyResultItem}>
                            <Text style={styles.frequencyResultLabel}>{freq.label}</Text>
                            {freq.heard ? (
                                <CheckCircle size={20} color="#059669" strokeWidth={2} />
                            ) : (
                                <VolumeX size={20} color="#DC2626" strokeWidth={2} />
                            )}
                        </View>
                    ))}
                </View>

                <View style={styles.recommendationCard}>
                    <Text style={styles.recommendationTitle}>Recommendations</Text>
                    <Text style={styles.recommendationText}>
                        • Consider using recommended volume levels{'\n'}
                        • Use subtitles when watching videos{'\n'}
                        • Consult an audiologist if you have concerns{'\n'}
                        • Protect your hearing from loud noises
                    </Text>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => setCurrentStep('intro')}
                        activeOpacity={0.8}>
                        <Text style={styles.secondaryButtonText}>Retake Test</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            {currentStep === 'intro' && renderIntro()}
            {currentStep === 'testing' && renderTesting()}
            {currentStep === 'results' && renderResults()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    placeholder: {
        width: 40,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 32,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 32,
    },
    iconContainer: {
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFBEB',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    introTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12,
    },
    introText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    instructionsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    instructionsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    instructionText: {
        fontSize: 14,
        color: '#374151',
        flex: 1,
    },
    volumeControl: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
    },
    volumeLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
        textAlign: 'center',
    },
    volumeBar: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 16,
    },
    volumeFill: {
        height: '100%',
        backgroundColor: '#D97706',
        borderRadius: 4,
    },
    volumeButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    volumeButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    volumeButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    warningCard: {
        backgroundColor: '#FFFBEB',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
        marginBottom: 32,
    },
    warningText: {
        fontSize: 13,
        color: '#78350F',
        lineHeight: 18,
    },
    progressFill: {
        height: 8,
        backgroundColor: '#059669',
        borderRadius: 4,         // Rounded corners
    },
    progressBar: {
        marginBottom: 32,
    },
    progressBackground: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        textAlign: 'center',
    },
    questionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 8,
    },
    frequencyLabel: {
        fontSize: 16,
        color: '#D97706',
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 32,
    },
    soundVisualizer: {
        backgroundColor: '#FFFBEB',
        borderRadius: 20,
        padding: 48,
        alignItems: 'center',
        marginBottom: 24,
    },
    visualizerText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#92400E',
        marginTop: 16,
    },
    visualizerSubtext: {
        fontSize: 14,
        color: '#78350F',
        marginTop: 8,
    },
    playButton: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 32,
    },
    playButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    responseButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    responseButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 18,
        borderRadius: 12,
    },
    noButton: {
        backgroundColor: '#DC2626',
    },
    yesButton: {
        backgroundColor: '#059669',
    },
    responseButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    resultIconContainer: {
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    resultsTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12,
    },
    resultsText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    resultsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
    },
    resultItem: {
        alignItems: 'center',
    },
    resultLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
    },
    resultValue: {
        fontSize: 32,
        fontWeight: '700',
    },
    frequencyResults: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    frequencyResultsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    frequencyResultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    frequencyResultLabel: {
        fontSize: 14,
        color: '#374151',
    },
    recommendationCard: {
        backgroundColor: '#FFFBEB',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    recommendationTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#92400E',
        marginBottom: 12,
    },
    recommendationText: {
        fontSize: 14,
        color: '#78350F',
        lineHeight: 22,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#D97706',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        flex: 1,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    secondaryButton: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        flex: 1,
        borderColor: '#D97706',
        borderWidth:2
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#D97706',
    },
});


export default HearingTest;